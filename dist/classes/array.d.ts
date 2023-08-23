import { YumArray, YumArrayBase, YumCustom, YumExtendsTypeBase, YumInclude, YumIncludeRule, YumLabel, YumMerge, YumNullable, YumNullableRule, YumOf, YumOfRule, YumOptions, YumRange, YumRangeRule, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback } from '../types';
import { YumBaseClass } from './base';
export declare class YumArrayClass<Yum extends YumArrayBase = YumArray> extends YumBaseClass<Yum> {
    protected _yum: Yum;
    constructor(options?: YumOptions);
    label(label: string): YumArrayClass<YumLabel<Yum>>;
    custom(custom: string): YumArrayClass<YumCustom<Yum>>;
    transform(callback: YumTransformCallback<Yum>): YumArrayClass<YumTransform<Yum>>;
    merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumArrayClass<Extends>): YumArrayClass<YumMerge<Extends, Yum>>;
    nullable<Rule extends YumNullableRule>(rule: Rule): YumArrayClass<YumNullable<Rule, Yum>>;
    required<Rule extends YumRequiredRule>(rule: Rule): YumArrayClass<YumRequired<Rule, Yum>>;
    of<Rule extends {
        getSchema(): YumOfRule;
    }>(rule: Rule): YumArrayClass<YumOf<ReturnType<Rule['getSchema']>, Yum>>;
    range<Rule extends YumRangeRule>(rule: Rule): YumArrayClass<YumRange<Rule, Yum>>;
    include<Rule extends YumIncludeRule<Yum>>(rule: Rule[]): YumArrayClass<YumInclude<Rule, Yum>>;
}
export default function array(options?: YumOptions): YumArrayClass;
export declare function isArray(yum: unknown): yum is YumArrayClass<YumArrayBase>;
