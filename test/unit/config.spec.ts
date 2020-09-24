import { getConfigCache, setConfigCache } from '@/cache/queryConfigCache';

describe('> Config', () => {
  setConfigCache({
    retry: 1,
    ttl: 0,
  });

  it('# Should return config', () => {
    const config = getConfigCache();

    expect(config.ttl).toEqual(0);
    expect(config.retry).toEqual(1);
  });

  it('# Should have all properties set', () => {
    const config = getConfigCache();

    expect(config.ttl).toEqual(0);
    expect(config.retry).toEqual(1);
    expect(config.refetchOnMount).toBeTruthy();
    expect(config.refetchOnReconnect).toBeTruthy();
    expect(config.refetchOnWindowFocus).toBeTruthy();
  });
});
