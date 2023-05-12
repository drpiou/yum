import { YumErrorReason, YumOptions } from '../types';
import isError from './isError';
import makeError from './makeError';

export default function validateMany(conditions: (() => void)[], options?: YumOptions): void {
  let reasons: YumErrorReason[] | null = null;

  for (const condition of conditions) {
    try {
      condition();
    } catch (error) {
      if (!isError(error) || options?.first) {
        throw error;
      } else {
        reasons = [...(reasons || []), ...error.reasons];
      }
    }
  }

  if (reasons) {
    throw makeError(undefined, reasons);
  }
}
