/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.dev/license
 */

import { MemoryCache } from './memory';

const cache = new MemoryCache();

/**
 * Reference cache to evaluate cache
 *
 * @param key - Query key
 * @param theRef - Query state reference
 * @param ttl - Time to live
 * @public
 */
export function queryReferenceCache(key: string, theRef: any, ttl: number): void {
  const refCacheItem = cache.get(key);

  if (refCacheItem) {
    refCacheItem.data.push(theRef);
  } else {
    cache.set(key, [theRef], ttl > 0 ? ttl + 5000 : ttl);
  }
}
