import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache'
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue'
import shardedTagCache from '@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache'

// Pages are prerendered/ISR-cached in R2 (binding NEXT_INC_CACHE_R2_BUCKET) so a visit
// does not run Payload or D1. Edits in the CMS call revalidatePath (src/lib/revalidate.ts).
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: 'long-lived', shouldLazilyUpdateOnCacheHit: true }),
  queue: doQueue,
  tagCache: shardedTagCache({ baseShardSize: 4, regionalCache: true }),
  enableCacheInterception: true,
})
