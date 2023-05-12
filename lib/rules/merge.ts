import _merge from 'lodash/merge';
import { YumExtendsTypeBase, YumMerge, YumTypeBase } from '../types';

export default function merge<Yum extends YumTypeBase, Extends extends YumExtendsTypeBase<Yum>>(
  extend: Extends,
  yum: Yum,
): YumMerge<Extends, Yum> {
  return _merge({}, yum, extend) as YumMerge<Extends, Yum>;
}
