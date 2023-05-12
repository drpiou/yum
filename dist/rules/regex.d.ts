import { YumRegex, YumRegexAccept, YumRegexBase, YumRegexOptions, YumRegexRule, YumTypeBase } from '../types';
export default function regex<Yum extends YumRegexAccept, Rule extends YumRegexRule>(rule: Rule, yum: Yum, options?: YumRegexOptions): YumRegex<Rule, Yum>;
export declare function hasRegex(yum: YumTypeBase): yum is YumRegexBase;
