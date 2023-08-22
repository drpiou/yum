import { YumRequired, YumRequiredAccept, YumRequiredBase, YumRequiredOptions, YumRequiredRule, YumTypeBase } from '../types';
export default function required<Yum extends YumRequiredAccept, Rule extends YumRequiredRule>(rule: Rule, yum: Yum, options?: YumRequiredOptions): YumRequired<Rule, Yum>;
export declare function hasRequired(yum: YumTypeBase): yum is YumRequiredBase;
