import { YumDefault, YumTypeBase, YumValidateOptions } from '../types';
import catchError, { CatchErrorReturnType } from '../utils/catchError';
import validate from './validate';

export type ValidateSyncReturnType<Yum extends YumTypeBase> = CatchErrorReturnType<YumDefault<Yum>>;

export default function validateSync<Yum extends YumTypeBase>(
  yum: Yum,
  value: unknown,
  options?: YumValidateOptions,
): ValidateSyncReturnType<Yum> {
  return catchError(() => validate(yum, value, options));
}
