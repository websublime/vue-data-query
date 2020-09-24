import { CacheListeners, CacheItem } from '../types';

export class MemoryCache {
  private cache: Map<string, CacheItem>;

  private listeners: CacheListeners[];

  private ttl: number;

  constructor(data = {}, ttl = 0) {
    this.cache = new Map(Object.entries(data));
    this.listeners = [];
    this.ttl = ttl;
  }

  private notify(key: string): void {
    for (const listener of this.listeners) {
      listener(key);
    }
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  get(key: string): CacheItem | undefined {
    return this.cache.get(key);
  }

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

  clear(): void {
    this.cache.clear();
    this.notify('@all-empty');
  }

  size(): number {
    return this.cache.size;
  }

  remove(key: string): void {
    this.cache.delete(key);
    this.notify(key);
  }

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
