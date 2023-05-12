import { YumRange, YumRangeAccept, YumRangeBase, YumRangeOptions, YumRangeRule, YumTypeBase } from '../types';
export default function range<Yum extends YumRangeAccept, Rule extends YumRangeRule>(rule: Rule, yum: Yum, options?: YumRangeOptions): YumRange<Rule, Yum>;
export declare function hasRange(yum: YumTypeBase): yum is YumRangeBase;
