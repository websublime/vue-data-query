/* eslint-disable @typescript-eslint/ban-types */
import { MemoryCache } from '@/cache/memory';
/*import Vue from 'vue';

jest.useFakeTimers();
const timeout: Function = (milliseconds: number) => jest.advanceTimersByTime(milliseconds);

const tick: Function = async (vm: Vue, times: number) => {
  for (const _time in [...Array(times).keys()]) {
    await vm.$nextTick();
  }
};*/

describe('> Memory Cache', () => {
  let memoryCache: MemoryCache;

  beforeEach(() => {
    memoryCache = new MemoryCache({}, 0);
  });

  it('Should retrieve item from cache', () => {
    memoryCache.set('faker', { hello: 'world' }, 0);

    expect(memoryCache.has('faker')).toBeTruthy();
  });

  it('Should expire item', (done) => {
    memoryCache.set('faker', { hello: 'world' }, 500);

    setTimeout(() => {
      expect(memoryCache.has('faker')).toBeFalsy();
      done();
    }, 600);
  });

  it('Should notify listeners', (done) => {
    const listener = (key: string) => {
      expect(memoryCache.has('faker')).toBeTruthy();
      expect(key).toEqual('faker');

      done();
    };

    memoryCache.subscribe(listener);

    memoryCache.set('faker', { hello: 'world' }, 0);
  });

  it('Should clear cache', (done) => {
    const listener = (key: string) => {
      if (key !== 'faker') {
        expect(memoryCache.size()).toEqual(0);
        expect(key).toEqual('@all-empty');

        done();
      }
    };

    memoryCache.subscribe(listener);

    memoryCache.set('faker', { hello: 'world' }, 0);
    memoryCache.clear();
  });
});
