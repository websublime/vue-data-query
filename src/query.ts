import { Fetcher, Key } from './types';
import { ref, watch, Ref, toRefs, onMounted } from '@vue/composition-api';
import { createEmptyStateRef } from './utils';
import { queryReferenceCache } from './cache/queryReferenceCache';
import { getConfigCache } from './cache/queryConfigCache';
import { queryRevalidate } from './cache/queryRevalidate';

export function useQuery<R>(key: Key = '', fetcher?: Fetcher<R>): any {
  const keyRef = typeof key === 'function' ? key : ref<string>(key as string);
  const stateRef = createEmptyStateRef();
  const config = getConfigCache();

  onMounted(() => {
    if (!stateRef.error) {
      queryRevalidate(fetcher as any, keyRef as any, stateRef);
    }
  });

  try {
    watch(
      keyRef,
      (value) => {
        (keyRef as Ref<string>).value = value;
        stateRef.key = value;

        queryReferenceCache((keyRef as Ref<string>).value, stateRef, config.ttl);

        queryRevalidate(fetcher as any, keyRef as any, stateRef);
      },
      { immediate: true },
    );
  } catch (error) {
    console.log(error);
  }

  return {
    ...toRefs(stateRef),
  };
}
