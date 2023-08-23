import { YumCustom, YumDate, YumDateBase, YumExtendsTypeBase, YumInclude, YumIncludeRule, YumLabel, YumMerge, YumNullable, YumNullableRule, YumOptions, YumRange, YumRangeRule, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback } from '../types';
import { YumBaseClass } from './base';
export declare class YumDateClass<Yum extends YumDateBase = YumDate> extends YumBaseClass<Yum> {
    protected _yum: Yum;
    constructor(options?: YumOptions);
    label(label: string): YumDateClass<YumLabel<Yum>>;
    custom(custom: string): YumDateClass<YumCustom<Yum>>;
    transform(callback: YumTransformCallback<Yum>): YumDateClass<YumTransform<Yum>>;
    merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumDateClass<Extends>): YumDateClass<YumMerge<Extends, Yum>>;
    nullable<Rule extends YumNullableRule>(rule: Rule): YumDateClass<YumNullable<Rule, Yum>>;
    required<Rule extends YumRequiredRule>(rule: Rule): YumDateClass<YumRequired<Rule, Yum>>;
    range<Rule extends YumRangeRule>(rule: Rule): YumDateClass<YumRange<Rule, Yum>>;
    include<Rule extends YumIncludeRule<Yum>>(rule: Rule[]): YumDateClass<YumInclude<Rule, Yum>>;
}
export default function date(options?: YumOptions): YumDateClass;
export declare function isDate(yum: unknown): yum is YumDateClass<YumDateBase>;
