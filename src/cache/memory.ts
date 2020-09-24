/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.dev/license
 */

import { CacheListeners, CacheItem } from '../types';

/**
 * Initial and default cache mode in memory browser.
 *
 * @public
 */
export class MemoryCache {
  /**
   * Cache repo Map
   *
   * @private
   */
  private cache: Map<string, CacheItem>;

  /**
   * Collection of registered listeners
   *
   * @private
   */
  private listeners: CacheListeners[];

  /**
   * Time to live. Cache expiration.
   *
   * @private
   */
  private ttl: number;

  constructor(data = {}, ttl = 0) {
    this.cache = new Map(Object.entries(data));
    this.listeners = [];
    this.ttl = ttl;
  }

  /**
   * Notify listeners
   *
   * @param key - Query quey
   * @private
   */
  private notify(key: string): void {
    for (const listener of this.listeners) {
      listener(key);
    }
  }

  /**
   * Verify if query key exist
   *
   * @param key - Query key
   * @private
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Get all queries keys
   *
   * @public
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache item
   *
   * @param key - Query key
   * @public
   */
  get(key: string): CacheItem | undefined {
    return this.cache.get(key);
  }

  /**
   * Set query key data on cache
   *
   * @param key - Query key
   * @param item - Data
   * @param ttl - Time to live
   * @public
   */
  set(key: string, item: any, ttl: number): void {
    const timeToLive = ttl || this.ttl;
    const now = Date.now();

    const cacheItem = {
      data: item,
      createdAt: now,
      expiresAt: timeToLive ? now + timeToLive : Infinity,
    };

    if (timeToLive) {
      const timeout = setTimeout(() => {
        const current = Date.now();
        const isExpired = current >= cacheItem.expiresAt;

        if (isExpired) {
          this.remove(key);
        }

        clearTimeout(timeout);
      }, timeToLive);
    }

    this.cache.set(key, cacheItem);
    this.notify(key);
  }

  /**
   * Clear cache
   *
   * @public
   */
  clear(): void {
    this.cache.clear();
    this.notify('@all-empty');
  }

  /**
   * Size of cache
   *
   * @public
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Remove key/data from cache
   *
   * @param key - Query key
   */
  remove(key: string): void {
    this.cache.delete(key);
    this.notify(key);
  }

  /**
   * Subscribe to listen for changes on cache
   *
   * @param listener - Function listener
   */
  subscribe(listener: CacheListeners): () => void {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    let isSubscribed = true;
    this.listeners.push(listener);

    return () => {
      if (!isSubscribed) return;

      isSubscribed = false;

      const idx = this.listeners.indexOf(listener);

      if (idx > -1) {
        this.listeners[idx] = this.listeners[this.listeners.length - 1];
        this.listeners.length--;
      }
    };
  }
}
