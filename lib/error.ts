import { filterNullish } from '@drpiou/ts-utils';
import castArray from 'lodash/castArray';
import { YumErrorReason } from './types';

export default class YumError extends TypeError {
  readonly reasons: YumErrorReason[] = [];

  constructor(message?: string, reasons?: YumErrorReason | YumErrorReason[]) {
    super(message ?? 'Unprocessable Entity.');

    this.addReasons(filterNullish(castArray(reasons)));
  }

  addReasons(reasons: YumErrorReason[]): void {
    this.reasons.push(...reasons);
  }
}
