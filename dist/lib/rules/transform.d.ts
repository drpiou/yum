import { YumTransform, YumTransformAccept, YumTransformBase, YumTransformCallback, YumTypeBase } from '../types';
export default function transform<Yum extends YumTransformAccept>(callback: YumTransformCallback<Yum>, yum: Yum): YumTransform<Yum>;
export declare function hasTransform(yum: YumTypeBase): yum is YumTransformBase;
