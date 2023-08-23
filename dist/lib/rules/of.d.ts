import { YumOf, YumOfAccept, YumOfBase, YumOfRule, YumTypeBase } from '../types';
export default function of<Yum extends YumOfAccept, Rule extends YumOfRule>(rule: Rule, yum: Yum): YumOf<Rule, Yum>;
export declare function hasOf(yum: YumTypeBase): yum is YumOfBase;
