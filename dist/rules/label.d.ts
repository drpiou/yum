import { YumLabel, YumLabelAccept, YumLabelBase, YumTypeBase } from '../types';
export default function label<Yum extends YumLabelAccept>(text: string, yum: Yum): YumLabel<Yum>;
export declare function hasLabel(yum: YumTypeBase): yum is YumLabelBase;
