import { YumBoolean, YumBooleanBase, YumCustom, YumExtendsTypeBase, YumLabel, YumMerge, YumNullable, YumNullableRule, YumOptions, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback } from '../types';
import { YumBaseClass } from './base';
export declare class YumBooleanClass<Yum extends YumBooleanBase = YumBoolean> extends YumBaseClass<Yum> {
    protected _yum: Yum;
    constructor(options?: YumOptions);
    label(label: string): YumBooleanClass<YumLabel<Yum>>;
    custom(custom: string): YumBooleanClass<YumCustom<Yum>>;
    transform(callback: YumTransformCallback<Yum>): YumBooleanClass<YumTransform<Yum>>;
    merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumBooleanClass<Extends>): YumBooleanClass<YumMerge<Extends, Yum>>;
    nullable<Rule extends YumNullableRule>(rule: Rule): YumBooleanClass<YumNullable<Rule, Yum>>;
    required<Rule extends YumRequiredRule>(rule: Rule): YumBooleanClass<YumRequired<Rule, Yum>>;
}
export default function boolean(options?: YumOptions): YumBooleanClass;
export declare function isBoolean(yum: unknown): yum is YumBooleanClass<YumBooleanBase>;
