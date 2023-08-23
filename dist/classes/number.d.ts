import { YumCustom, YumExtendsTypeBase, YumInclude, YumIncludeRule, YumLabel, YumMerge, YumNullable, YumNullableRule, YumNumber, YumNumberBase, YumOptions, YumRange, YumRangeRule, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback } from '../types';
import { YumBaseClass } from './base';
export declare class YumNumberClass<Yum extends YumNumberBase = YumNumber> extends YumBaseClass<Yum> {
    protected _yum: Yum;
    constructor(options?: YumOptions);
    label(label: string): YumNumberClass<YumLabel<Yum>>;
    custom(custom: string): YumNumberClass<YumCustom<Yum>>;
    transform(callback: YumTransformCallback<Yum>): YumNumberClass<YumTransform<Yum>>;
    merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumNumberClass<Extends>): YumNumberClass<YumMerge<Extends, Yum>>;
    nullable<Rule extends YumNullableRule>(rule: Rule): YumNumberClass<YumNullable<Rule, Yum>>;
    required<Rule extends YumRequiredRule>(rule: Rule): YumNumberClass<YumRequired<Rule, Yum>>;
    range<Rule extends YumRangeRule>(rule: Rule): YumNumberClass<YumRange<Rule, Yum>>;
    include<Rule extends YumIncludeRule<Yum>>(rule: Rule[]): YumNumberClass<YumInclude<Rule, Yum>>;
}
export default function number(options?: YumOptions): YumNumberClass;
export declare function isNumber(yum: unknown): yum is YumNumberClass<YumNumberBase>;
