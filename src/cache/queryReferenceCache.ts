import { MemoryCache } from './memory';

const cache = new MemoryCache();

export function queryReferenceCache(key: string, theRef: any, ttl: number): void {
  const refCacheItem = cache.get(key);

  if (refCacheItem) {
    refCacheItem.data.push(theRef);
  } else {
    cache.set(key, [theRef], ttl > 0 ? ttl + 5000 : ttl);
  }
}
