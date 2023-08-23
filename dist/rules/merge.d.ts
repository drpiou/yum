import { YumExtendsTypeBase, YumMerge, YumTypeBase } from '../types';
export default function merge<Yum extends YumTypeBase, Extends extends YumExtendsTypeBase<Yum>>(extend: Extends, yum: Yum): YumMerge<Extends, Yum>;
