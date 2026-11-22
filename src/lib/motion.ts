'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;

/** Smooth scrolling, native on touch, off under reduced motion. */
export function initSmoothScroll() {
	if (prefersReducedMotion()) return () => {};
	const l = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
	lenis = l;
	l.on("scroll", ScrollTrigger.update);
	const tick = (time: number) => l.raf(time * 1000);
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);
	return () => {
		gsap.ticker.remove(tick);
		l.destroy();
		lenis = null;
	};
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export function scrollToTop() {
	if (lenis) lenis.scrollTo(0, { duration: 1.2 });
	else
		window.scrollTo({
			top: 0,
			behavior: prefersReducedMotion() ? "auto" : "smooth",
		});
}

export function scrollToY(y: number) {
	if (lenis) lenis.scrollTo(y, { duration: 1.4 });
	else
		window.scrollTo({
			top: y,
			behavior: prefersReducedMotion() ? "auto" : "smooth",
		});
}

export function scrollToId(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	if (lenis) lenis.scrollTo(el, { duration: 1.4 });
	else
		el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

const aboveViewport = (el: Element) => el.getBoundingClientRect().bottom < 0;

/**
 * Drives every scroll reveal from data attributes:
 *  data-reveal="up" | "image" | "rule" | "stagger"
 *  data-count="63" (count-up numeral)
 * Content stays visible if this never runs.
 */
export function useReveal(
	scope: RefObject<HTMLElement | null>,
	enabled: boolean,
	key?: string,
) {
	useGSAP(
		() => {
			if (!enabled || prefersReducedMotion() || !scope.current) return;
			const trigger = (el: Element, start = "top 96%") => ({
				trigger: el,
				start,
				once: true,
			});

			gsap.utils.toArray<HTMLElement>("[data-reveal='up']").forEach((el) => {
				if (aboveViewport(el)) return;
				gsap.from(el, {
					y: 36,
					autoAlpha: 0,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: trigger(el),
				});
			});

			gsap.utils.toArray<HTMLElement>("[data-reveal='image']").forEach((el) => {
				if (aboveViewport(el)) return;
				const img = el.querySelector("img");
				const tl = gsap.timeline({ scrollTrigger: trigger(el, "top 85%") });
				tl.fromTo(
					el,
					{ clipPath: "inset(100% 0% 0% 0%)" },
					{ clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" },
				);
				if (img)
					tl.fromTo(
						img,
						{ scale: 1.06 },
						{ scale: 1, duration: 1.4, ease: "expo.out" },
						0.1,
					);
			});

			gsap.utils.toArray<HTMLElement>("[data-reveal='rule']").forEach((el) => {
				if (aboveViewport(el)) return;
				gsap.from(el, {
					scaleX: 0,
					transformOrigin: "left center",
					duration: 1.1,
					ease: "expo.out",
					scrollTrigger: trigger(el, "top 92%"),
				});
			});

			gsap.utils
				.toArray<HTMLElement>("[data-reveal='stagger']")
				.forEach((el) => {
					if (aboveViewport(el)) return;
					gsap.from(Array.from(el.children), {
						y: 28,
						autoAlpha: 0,
						duration: 0.8,
						stagger: 0.08,
						ease: "power3.out",
						scrollTrigger: trigger(el),
					});
				});

			gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
				const end = Number(el.dataset.count);
				if (!Number.isFinite(end) || aboveViewport(el)) return;
				const state = { v: 0 };
				el.textContent = "0";
				gsap.to(state, {
					v: end,
					duration: 1.6,
					ease: "power2.out",
					onUpdate: () => {
						el.textContent = String(Math.round(state.v));
					},
					scrollTrigger: trigger(el, "top 90%"),
				});
			});

			ScrollTrigger.refresh();
		},
		{ scope, dependencies: [enabled, key] },
	);
}
