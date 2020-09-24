/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.dev/license
 */

import { reactive, UnwrapRef } from '@vue/composition-api';
import { StateRef } from './types';

/**
 * Create query state reference
 *
 * @public
 */
export function createEmptyStateRef<D = any>(): StateRef<UnwrapRef<D>, Error> {
  return reactive<StateRef<D, Error>>({
    data: undefined,
    error: null,
    isValidating: true,
    key: null,
  });
}
