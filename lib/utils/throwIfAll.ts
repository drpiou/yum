import { YumErrorReason } from '../types';
import isError from './isError';
import makeError from './makeError';

export default function throwIfAll(conditions: (() => boolean | undefined)[]): void {
  let reasons: YumErrorReason[] = [];

  let success = false;

  for (const condition of conditions) {
    try {
      if (condition()) {
        return;
      } else {
        success = true;
      }
    } catch (error) {
      if (!isError(error)) {
        throw error;
      } else {
        reasons = [...reasons, ...error.reasons];
      }
    }
  }

  if (!success) {
    throw makeError(undefined, reasons);
  }
}
