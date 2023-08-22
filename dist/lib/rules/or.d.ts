import { YumOr, YumOrAccept, YumOrBase, YumOrRule, YumTypeBase } from '../types';
export default function or<Yum extends YumOrAccept, Rule extends YumOrRule>(rule: Rule, yum: Yum): YumOr<Rule, Yum>;
export declare function hasOr(yum: YumTypeBase): yum is YumOrBase;
