import { brandConfig } from "../../config/brand";

/** Page background colour: one constant in src/config/brand.ts (keep in sync with --color-paper). */
export const BG_COLOR = brandConfig.paperColor;

function hexToRgb(hex: string): [number, number, number] {
	const n = Number.parseInt(hex.replace("#", ""), 16);
	return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform sampler2D u_left;
uniform sampler2D u_right;
uniform sampler2D u_text;
uniform vec2 u_leftSize;
uniform vec2 u_rightSize;
uniform vec4 u_leftRect;   // x, y, w, h in device px (top-left origin)
uniform vec4 u_rightRect;
uniform float u_split;     // x (px) where text flips from "streaky" to "inverted"
uniform vec2 u_mouse;      // px, top-left origin
uniform float u_mouseAmt;
uniform vec3 u_bg;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}

vec2 coverUV(vec2 px, vec4 rect, vec2 imgSize) {
  vec2 p = (px - rect.xy) / rect.zw;
  float ra = rect.z / rect.w, ia = imgSize.x / imgSize.y;
  vec2 s = ra > ia ? vec2(1.0, ia / ra) : vec2(ra / ia, 1.0);
  return (p - 0.5) * s + 0.5;
}

bool inRect(vec2 px, vec4 r) {
  return px.x >= r.x && px.x <= r.x + r.z && px.y >= r.y && px.y <= r.y + r.w;
}

float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

// Photo fill used inside the letters: smeared along a diagonal like rippled water
vec3 streaky(sampler2D tex, vec2 uv, vec2 px, float unit) {
  vec2 q = px / unit;
  float t = u_time * 0.25;
  float n = noise(vec2(q.x * 22.0 + q.y * 9.0, q.y * 4.0) + t);
  float n2 = noise(vec2(q.x * 10.0 - q.y * 6.0, q.y * 40.0) - t * 0.6);
  vec2 d = vec2(n - 0.5, n2 - 0.5) * 0.03;
  vec3 c = texture2D(tex, uv + d).rgb;
  // brushed grain
  float grain = noise(vec2(q.x * 90.0 + q.y * 30.0, q.y * 6.0));
  c = mix(c, c * 1.45, smoothstep(0.62, 0.95, grain) * 0.3);
  c = mix(c, c * 0.6, smoothstep(0.35, 0.05, grain) * 0.3);
  vec3 warm = vec3(luma(c)) * vec3(1.05, 0.86, 0.78);
  return mix(c, warm, 0.75) * 0.5;
}

vec3 invertedLook(sampler2D tex, vec2 uv) {
  vec3 c = texture2D(tex, uv).rgb;
  vec3 inv = 1.0 - c;
  inv = mix(vec3(luma(inv)), inv, 1.5);           // saturate
  inv *= 0.85;
  inv *= vec3(0.6, 0.9, 1.3);
  return clamp(inv, 0.0, 1.0);
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  float unit = u_res.x / 1704.0;
  vec3 col = u_bg;

  bool inL = inRect(px, u_leftRect);
  bool inR = inRect(px, u_rightRect);
  if (!inL && !inR) { gl_FragColor = vec4(col, 1.0); return; }

  vec4 rect = inL ? u_leftRect : u_rightRect;
  vec2 isz = inL ? u_leftSize : u_rightSize;
  vec2 uv = coverUV(px, rect, isz);

  // gentle pointer lens on the photo itself
  float md = length(px - u_mouse) / (260.0 * unit);
  vec2 push = normalize(px - u_mouse + 0.001) * exp(-md * md * 2.0) * 0.012 * u_mouseAmt;
  vec2 uvp = uv - push;

  vec3 photo = inL ? texture2D(u_left, uvp).rgb : texture2D(u_right, uvp).rgb;
  col = photo;

  // text mask, sampled with a little wobble for a liquid edge
  vec2 tuv = px / u_res;
  float wob = (noise(px / (18.0 * unit) + u_time * 0.4) - 0.5) * 0.0016;
  float m = texture2D(u_text, tuv + vec2(wob, wob * 0.5)).r;

  if (m > 0.003) {
    // noisy split edge
    float edge = u_split + (noise(vec2(px.y / (30.0 * unit), u_time * 0.3)) - 0.5) * 70.0 * unit
               + (noise(px / (6.0 * unit)) - 0.5) * 26.0 * unit;
    float inv = smoothstep(-5.0 * unit, 5.0 * unit, px.x - edge);

    vec3 a = inL ? streaky(u_left, uv, px, unit) : streaky(u_right, uv, px, unit);
    vec3 b = inL ? invertedLook(u_left, uvp) : invertedLook(u_right, uvp);
    vec3 fill = mix(a, b, inv);
    col = mix(photo, fill, m);
  }

  // faint film grain so it feels photographic
  col += (hash(px + fract(u_time)) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}
`;

export type HeroRefs = {
	stage: HTMLElement;
	canvas: HTMLCanvasElement;
	left: HTMLElement;
	right: HTMLElement;
	leftSrc: string;
	rightSrc: string;
	word: string;
	/** Called once, right after the first frame has been drawn */
	onReady?: () => void;
	/** Called when WebGL is unavailable so the caller can show the plain photos */
	onFallback?: () => void;
};

function sh(gl: WebGLRenderingContext, type: number, src: string) {
	const s = gl.createShader(type)!;
	gl.shaderSource(s, src);
	gl.compileShader(s);
	if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
		throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
	return s;
}

function loadImage(src: string) {
	return new Promise<HTMLImageElement>((res, rej) => {
		const i = new Image();
		i.onload = () => res(i);
		i.onerror = rej;
		i.src = src;
	});
}

export function initHero(r: HeroRefs) {
	const { stage, canvas } = r;
	const gl = canvas.getContext("webgl", {
		antialias: false,
		alpha: false,
		preserveDrawingBuffer: true,
	});
	if (!gl) {
		r.onFallback?.();
		r.onReady?.();
		return () => {};
	}

	const prog = gl.createProgram()!;
	gl.attachShader(prog, sh(gl, gl.VERTEX_SHADER, VERT));
	gl.attachShader(prog, sh(gl, gl.FRAGMENT_SHADER, FRAG));
	gl.linkProgram(prog);
	// biome-ignore lint/correctness/useHookAtTopLevel: WebGL call, not a React hook
	gl.useProgram(prog);

	const buf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([-1, -1, 3, -1, -1, 3]),
		gl.STATIC_DRAW,
	);
	const loc = gl.getAttribLocation(prog, "a_pos");
	gl.enableVertexAttribArray(loc);
	gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

	const U = (n: string) => gl.getUniformLocation(prog, n);
	const u = {
		res: U("u_res"),
		time: U("u_time"),
		left: U("u_left"),
		right: U("u_right"),
		text: U("u_text"),
		leftSize: U("u_leftSize"),
		rightSize: U("u_rightSize"),
		leftRect: U("u_leftRect"),
		rightRect: U("u_rightRect"),
		split: U("u_split"),
		mouse: U("u_mouse"),
		mouseAmt: U("u_mouseAmt"),
		bg: U("u_bg"),
	};

	gl.uniform3f(u.bg, ...hexToRgb(BG_COLOR));

	const makeTex = (unit: number) => {
		const t = gl.createTexture()!;
		gl.activeTexture(gl.TEXTURE0 + unit);
		gl.bindTexture(gl.TEXTURE_2D, t);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		return t;
	};
	makeTex(0);
	makeTex(1);
	makeTex(2);
	gl.uniform1i(u.left, 0);
	gl.uniform1i(u.right, 1);
	gl.uniform1i(u.text, 2);

	const sizes = { l: [1, 1], r: [1, 1] };
	let ready = false;
	Promise.all([
		loadImage(r.leftSrc),
		loadImage(r.rightSrc),
		document.fonts.load('800 200px "Archivo Variable"'),
	]).then(([l, rr]) => {
		gl.activeTexture(gl.TEXTURE0);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, l);
		gl.activeTexture(gl.TEXTURE1);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, rr);
		sizes.l = [l.naturalWidth, l.naturalHeight];
		sizes.r = [rr.naturalWidth, rr.naturalHeight];
		ready = true;
		layout();
	}).catch(() => {
		// An image failed to load: never leave the loader up forever.
		r.onFallback?.();
		r.onReady?.();
	});
	// Safety net: release the loader even if loading stalls.
	setTimeout(() => {
		if (!notified) {
			notified = true;
			r.onFallback?.();
			r.onReady?.();
		}
	}, 8000);

	const rects = { l: [0, 0, 0, 0], r: [0, 0, 0, 0] };
	let defaultSplit = 0;
	let splitTarget = 0;
	let split = 0;
	let dpr = 1;

	function layout() {
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		const sb = stage.getBoundingClientRect();
		const W = Math.round(sb.width * dpr);
		const H = Math.round(sb.height * dpr);
		canvas.width = W;
		canvas.height = H;
		gl!.viewport(0, 0, W, H);
		const rel = (el: HTMLElement) => {
			const b = el.getBoundingClientRect();
			return [
				(b.left - sb.left) * dpr,
				(b.top - sb.top) * dpr,
				b.width * dpr,
				b.height * dpr,
			];
		};
		rects.l = rel(r.left);
		rects.r = rel(r.right);

		// draw the word to a 2D canvas used as the mask
		const c = document.createElement("canvas");
		c.width = W;
		c.height = H;
		const ctx = c.getContext("2d")!;
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, W, H);
		ctx.fillStyle = "#fff";
		ctx.textBaseline = "alphabetic";
		const x0 = rects.l[0];
		const x1 = rects.r[0] + rects.r[2];
		const fam = '"Archivo Variable", "Helvetica Neue", Arial, sans-serif';
		const setFont = (px: number) => {
			ctx.font = `800 ${px}px ${fam}`;
			(ctx as any).fontStretch = "semi-expanded";
			(ctx as any).letterSpacing = `${-0.03 * px}px`;
		};
		setFont(200);
		const m0 = ctx.measureText(r.word);
		const size =
			(200 * (x1 - x0)) /
			(m0.actualBoundingBoxRight + m0.actualBoundingBoxLeft);
		setFont(size);
		const mM = ctx.measureText("M");
		const baseline = rects.l[1] + mM.actualBoundingBoxAscent + size * 0.0;
		const m1 = ctx.measureText(r.word);
		ctx.fillText(r.word, x0 + m1.actualBoundingBoxLeft, baseline);

		gl!.activeTexture(gl!.TEXTURE2);
		gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, c);

		defaultSplit = rects.l[0] + rects.l[2] * 0.955;
		if (!split) split = defaultSplit;
		splitTarget = defaultSplit;
	}
	layout();

	const mouse = { x: -9999, y: -9999, amt: 0, target: 0 };
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let visible = true;
	const io = new IntersectionObserver(([e]) => {
		visible = e.isIntersecting;
	});
	io.observe(stage);
	const onMove = (e: PointerEvent) => {
		if (reduced) return;
		const sb = stage.getBoundingClientRect();
		const inside =
			e.clientX >= sb.left &&
			e.clientX <= sb.right &&
			e.clientY >= sb.top &&
			e.clientY <= sb.bottom;
		if (!inside) {
			mouse.target = 0;
			splitTarget = defaultSplit;
			return;
		}
		mouse.x = (e.clientX - sb.left) * dpr;
		mouse.y = (e.clientY - sb.top) * dpr;
		mouse.target = 1;
		splitTarget = mouse.x;
	};
	const onLeave = () => {
		mouse.target = 0;
		splitTarget = defaultSplit;
	};
	window.addEventListener("pointermove", onMove);
	document.addEventListener("pointerleave", onLeave);
	const ro = new ResizeObserver(layout);
	ro.observe(stage);

	let raf = 0;
	let notified = false;
	const t0 = performance.now();
	const frame = () => {
		raf = requestAnimationFrame(frame);
		if (!ready || !visible) return;
		split += (splitTarget - split) * 0.08;
		mouse.amt += (mouse.target - mouse.amt) * 0.1;
		gl.uniform2f(u.res, canvas.width, canvas.height);
		gl.uniform1f(u.time, reduced ? 4 : (performance.now() - t0) / 1000);
		gl.uniform2f(u.leftSize, sizes.l[0], sizes.l[1]);
		gl.uniform2f(u.rightSize, sizes.r[0], sizes.r[1]);
		gl.uniform4f(u.leftRect, rects.l[0], rects.l[1], rects.l[2], rects.l[3]);
		gl.uniform4f(u.rightRect, rects.r[0], rects.r[1], rects.r[2], rects.r[3]);
		gl.uniform1f(u.split, split);
		gl.uniform2f(u.mouse, mouse.x, mouse.y);
		gl.uniform1f(u.mouseAmt, mouse.amt);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
		if (!notified) {
			notified = true;
			// wait a paint so the canvas actually has pixels on screen
			requestAnimationFrame(() => r.onReady?.());
		}
	};
	raf = requestAnimationFrame(frame);

	return () => {
		cancelAnimationFrame(raf);
		ro.disconnect();
		io.disconnect();
		window.removeEventListener("pointermove", onMove);
		document.removeEventListener("pointerleave", onLeave);
	};
}
