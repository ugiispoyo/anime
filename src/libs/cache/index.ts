type CacheEntry = {
  data: any
  timestamp: number
  staleTime: number
}

const cache = new Map<string, CacheEntry>()

/* For debugging purposes, expose the cache on the window object */
if (typeof window !== 'undefined') {
  ;(window as any).myCache = cache
}

const STALE_TIME = 10 * 60 * 1000 // 10 minutes in ms

export function getFromCache(key: string) {
  const entry = cache.get(key)
  if (!entry) return null

  const now = Date.now()
  const isStale = now - entry.timestamp > entry.staleTime

  if (isStale) {
    cache.delete(key)
    return null
  }

  return entry.data
}

export function setToCache(key: string, data: any, staleTime = STALE_TIME) {
  cache.set(key, { data, timestamp: Date.now(), staleTime })
}

export function clearCache(key?: string) {
  if (key) {
    return cache.delete(key)
  }
  cache.clear()
}
