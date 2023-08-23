import { YumDefault, YumMixed, YumOptions, YumOr, YumOrRule } from '../types';
export default function mixedOf<Of extends YumOrRule>(of: Of, options?: YumOptions): YumOr<Of, YumMixed<YumDefault<Of[number]>>>;
