import { YumLabel, YumLabelAccept, YumLabelBase, YumTypeBase } from '../types';

export default function label<Yum extends YumLabelAccept>(text: string, yum: Yum): YumLabel<Yum> {
  return {
    ...yum,
    label: text,
  };
}

export function hasLabel(yum: YumTypeBase): yum is YumLabelBase {
  return 'label' in yum;
}
