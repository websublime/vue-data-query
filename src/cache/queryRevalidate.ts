import { CacheItem, Fetcher, StateRef } from '@/types';
import { Ref } from '@vue/composition-api';
import { getConfigCache } from './queryConfigCache';

export function queryRevalidate(data: Fetcher<any>, keyRef: Ref<string>, state: StateRef) {
  const { value: keyVal } = keyRef || {};

  if (!keyVal) {
    return;
  }

  const config = getConfigCache();
  const cacheItem: CacheItem = config.cache.get(keyVal);
  const itemData = cacheItem && cacheItem.data;

  state.isValidating = true;

  if (itemData) {
    state.data = itemData.data;
    state.error = itemData.error;

    state.isValidating = false;
    return;
  }

  if (!data) {
    state.isValidating = false;
    return;
  }

  const val = data(keyVal);
  config.cache.set(keyVal, { data: val, isValidating: false, error: state.error }, config.ttl);

  state.isValidating = false;
}
