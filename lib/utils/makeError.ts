import YumError from '../error';
import { YumErrorReason } from '../types';

export default function makeError(message?: string, reasons?: YumErrorReason | YumErrorReason[]): YumError {
  return new YumError(message, reasons);
}
