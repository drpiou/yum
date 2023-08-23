import { YumCustom, YumCustomAccept, YumCustomBase, YumTypeBase } from '../types';
export default function custom<Yum extends YumCustomAccept>(text: string, yum: Yum): YumCustom<Yum>;
export declare function hasCustom(yum: YumTypeBase): yum is YumCustomBase;
