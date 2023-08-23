import { YumShape, YumShapeAccept, YumShapeBase, YumShapeRule, YumTypeBase } from '../types';
export default function shape<Yum extends YumShapeAccept, Rule extends YumShapeRule>(rule: Rule, yum: Yum): YumShape<Rule, Yum>;
export declare function hasShape(yum: YumTypeBase): yum is YumShapeBase;
