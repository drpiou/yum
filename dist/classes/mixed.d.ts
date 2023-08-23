import { YumCustom, YumDefault, YumExtendsTypeBase, YumLabel, YumMerge, YumMixed, YumMixedBase, YumNullable, YumNullableRule, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback, YumTypeBase } from '../types';
import { YumBaseClass } from './base';
export declare class YumMixedClass<Yum extends YumMixedBase = YumMixed> extends YumBaseClass<Yum> {
    protected _yum: Yum;
    constructor();
    static of<Of extends {
        getSchema(): YumTypeBase;
    }[]>(of: Of): YumMixedClass<YumMixed<YumDefault<ReturnType<Of[number]['getSchema']>>>>;
    label(label: string): YumMixedClass<YumLabel<Yum>>;
    custom(custom: string): YumMixedClass<YumCustom<Yum>>;
    transform(callback: YumTransformCallback<Yum>): YumMixedClass<YumTransform<Yum>>;
    merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumMixedClass<Extends>): YumMixedClass<YumMerge<Extends, Yum>>;
    nullable<Rule extends YumNullableRule>(rule: Rule): YumMixedClass<YumNullable<Rule, Yum>>;
    required<Rule extends YumRequiredRule>(rule: Rule): YumMixedClass<YumRequired<Rule, Yum>>;
}
export default function mixed(): YumMixedClass;
export declare function isMixed(yum: unknown): yum is YumMixedClass<YumMixedBase>;
