import { YumNullable, YumNullableAccept, YumNullableBase, YumNullableOptions, YumNullableRule, YumTypeBase } from '../types';
export default function nullable<Yum extends YumNullableAccept, Rule extends YumNullableRule>(rule: Rule, yum: Yum, options?: YumNullableOptions): YumNullable<Rule, Yum>;
export declare function hasNullable(yum: YumTypeBase): yum is YumNullableBase;
