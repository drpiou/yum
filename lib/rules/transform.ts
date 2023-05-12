import { YumTransform, YumTransformAccept, YumTransformBase, YumTransformCallback, YumTypeBase } from '../types';

export default function transform<Yum extends YumTransformAccept>(
  callback: YumTransformCallback<Yum>,
  yum: Yum,
): YumTransform<Yum> {
  return {
    ...yum,
    transform: callback,
  };
}

export function hasTransform(yum: YumTypeBase): yum is YumTransformBase {
  return 'transform' in yum;
}
