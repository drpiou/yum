import { YumDefault, YumTypeBase, YumValidateOptions } from '../types';
export default function validate<Yum extends YumTypeBase>(yum: Yum, value: unknown, options?: YumValidateOptions): YumDefault<Yum>;
