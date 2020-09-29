/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.dev/license
 */

import { Config } from '../types';
import { MemoryCache } from './memory';

/**
 * Default configuration
 *
 * @private
 */
const DEFAULT_CONFIG: Config = {
  ttl: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnReconnect: true,
  refetchOnWindowFocus: true,
  retry: 3,
  cache: new MemoryCache(),
};

/**
 * Getter configuration
 * @private
 */
const CONFIG_CACHE = Object.assign({}, DEFAULT_CONFIG);

/**
 * Retrieve set and merged deafault configuration
 *
 * @public
 */
export function getConfigCache(): Config {
  return CONFIG_CACHE as Config;
}

/**
 * Sets and merges properties with default configuration
 *
 * @param config - Config to merge with default
 * @public
 */
export function setConfigCache(config: Partial<Config> = {}): void {
  Object.assign(CONFIG_CACHE, DEFAULT_CONFIG, config);
}
