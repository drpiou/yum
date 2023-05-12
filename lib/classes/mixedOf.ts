import { YumTypeBase } from '../types';
import { YumMixedClass } from './mixed';

export default function mixedOf<Of extends { getSchema(): YumTypeBase }[]>(of: Of) {
  return YumMixedClass.of(of);
}
