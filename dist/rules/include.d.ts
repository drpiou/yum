import { YumInclude, YumIncludeAccept, YumIncludeBase, YumIncludeOptions, YumIncludeRule, YumTypeBase } from '../types';
export default function include<Yum extends YumIncludeAccept, Rule extends YumIncludeRule<Yum>>(rule: Rule[], yum: Yum, options?: YumIncludeOptions<Yum>): YumInclude<Rule, Yum>;
export declare function hasInclude(yum: YumTypeBase): yum is YumIncludeBase;
