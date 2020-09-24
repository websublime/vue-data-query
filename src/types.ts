/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type Config = {
  ttl: number;
  refetchOnMount: boolean;
  refetchOnReconnect: boolean;
  refetchOnWindowFocus: boolean;
  retry: number;
};

export interface CacheItem {
  data: any;
  createdAt: number;
  expiresAt: number;
}

export type Fetcher<Data> = (...args: any) => Data | Promise<Data>;
