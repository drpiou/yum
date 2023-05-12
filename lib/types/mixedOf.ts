import or from '../rules/or';
import { YumDefault, YumMixed, YumOptions, YumOr, YumOrRule } from '../types';
import mixed from './mixed';

export default function mixedOf<Of extends YumOrRule>(of: Of, options?: YumOptions): YumOr<Of, YumMixed<YumDefault<Of[number]>>> {
  return or(of, mixed(options));
}
