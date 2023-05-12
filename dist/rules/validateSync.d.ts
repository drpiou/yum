import { YumDefault, YumTypeBase, YumValidateOptions } from '../types';
import { CatchErrorReturnType } from '../utils/catchError';
export type ValidateSyncReturnType<Yum extends YumTypeBase> = CatchErrorReturnType<YumDefault<Yum>>;
export default function validateSync<Yum extends YumTypeBase>(yum: Yum, value: unknown, options?: YumValidateOptions): ValidateSyncReturnType<Yum>;
