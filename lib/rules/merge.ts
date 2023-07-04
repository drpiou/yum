import _merge from 'lodash/merge';
import { YumExtendsTypeBase, YumMerge, YumTypeBase } from '../types';

export default function merge<Yum extends YumTypeBase, Extends extends YumExtendsTypeBase<Yum>>(
  extend: Extends,
  yum: Yum,
): YumMerge<Extends, Yum> {
  if (yum.type === extend.type) {
    return _merge({}, yum, extend) as YumMerge<Extends, Yum>;
  } else {
    return yum as YumMerge<Extends, Yum>;
  }
}
