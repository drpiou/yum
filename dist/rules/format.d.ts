import { YumFormat, YumFormatAccept, YumFormatBase, YumFormatOptions, YumFormatRule, YumTypeBase } from '../types';
export default function format<Yum extends YumFormatAccept, Rule extends YumFormatRule>(rule: Rule, yum: Yum, options?: YumFormatOptions<Rule>): YumFormat<Rule, Yum>;
export declare function hasFormat(yum: YumTypeBase): yum is YumFormatBase;
