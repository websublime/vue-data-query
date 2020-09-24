import { Fetcher, Key } from './types';
import { ref, watch, Ref, toRefs } from '@vue/composition-api';
import { createEmptyStateRef } from './utils';
import { queryReferenceCache } from './cache/queryReferenceCache';

export function useQuery<R>(key: Key = '', _fetcher?: Fetcher<R>): any {
  const keyRef = typeof key === 'function' ? key : ref<string>(key as string);
  const stateRef = createEmptyStateRef();

  try {
    watch(
      keyRef,
      (value) => {
        (keyRef as Ref<string>).value = value;
        stateRef.key = value;

        queryReferenceCache((keyRef as Ref<string>).value, stateRef, 0);
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
