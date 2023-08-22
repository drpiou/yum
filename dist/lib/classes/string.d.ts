import { YumExtendsTypeBase, YumFormat, YumFormatOptions, YumFormatRule, YumInclude, YumIncludeRule, YumLabel, YumMerge, YumNullable, YumNullableRule, YumOptions, YumRange, YumRangeRule, YumRegex, YumRegexRule, YumRequired, YumRequiredRule, YumString, YumStringBase, YumTransform, YumTransformCallback } from '../types';
import { YumBaseClass } from './base';
export declare class YumStringClass<Yum extends YumStringBase = YumString> extends YumBaseClass<Yum> {
    protected _yum: Yum;
    constructor(options?: YumOptions);
    label(label: string): YumStringClass<YumLabel<Yum>>;
    transform(callback: YumTransformCallback<Yum>): YumStringClass<YumTransform<Yum>>;
    merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumStringClass<Extends>): YumStringClass<YumMerge<Extends, Yum>>;
    nullable<Rule extends YumNullableRule>(rule: Rule): YumStringClass<YumNullable<Rule, Yum>>;
    required<Rule extends YumRequiredRule>(rule: Rule): YumStringClass<YumRequired<Rule, Yum>>;
    range<Rule extends YumRangeRule>(rule: Rule): YumStringClass<YumRange<Rule, Yum>>;
    regex<Rule extends YumRegexRule>(rule: Rule): YumStringClass<YumRegex<Rule, Yum>>;
    format<Rule extends YumFormatRule>(rule: Rule, options?: YumFormatOptions<Rule>): YumStringClass<YumFormat<Rule, Yum>>;
    include<Rule extends YumIncludeRule<Yum>>(rule: Rule[]): YumStringClass<YumInclude<Rule, Yum>>;
}
export default function string(options?: YumOptions): YumStringClass;
export declare function isString(yum: unknown): yum is YumStringClass<YumStringBase>;
