import { YumCustom, YumCustomAccept, YumCustomBase, YumTypeBase } from '../types';

export default function custom<Yum extends YumCustomAccept>(text: string, yum: Yum): YumCustom<Yum> {
  return {
    ...yum,
    custom: text,
  };
}

export function hasCustom(yum: YumTypeBase): yum is YumCustomBase {
  return 'custom' in yum;
}
