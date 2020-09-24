import { Ref } from '@vue/composition-api';

type KeyFunction = () => string;

export type Key = KeyFunction | string | null;

export type StateRef<Data, Error> = {
  data: Data | undefined;
  error: Error | null;
  isValidating: boolean;
  revalidate?: () => void;
  key: Key | Ref<string>;
};

export type CacheListeners = (...args: any[]) => void;

export interface CacheItem {
  data: any;
  createdAt: number;
  expiresAt: number;
}
