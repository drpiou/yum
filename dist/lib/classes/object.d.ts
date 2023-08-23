import { YumCustom, YumExtendsTypeBase, YumLabel, YumMerge, YumNullable, YumNullableRule, YumObject, YumObjectBase, YumOptions, YumRequired, YumRequiredRule, YumShape, YumTransform, YumTransformCallback, YumTypeBase } from '../types';
import { YumBaseClass } from './base';
export declare class YumObjectClass<Yum extends YumObjectBase = YumObject> extends YumBaseClass<Yum> {
    protected _yum: Yum;
    constructor(options?: YumOptions);
    label(label: string): YumObjectClass<YumLabel<Yum>>;
    custom(custom: string): YumObjectClass<YumCustom<Yum>>;
    transform(callback: YumTransformCallback<Yum>): YumObjectClass<YumTransform<Yum>>;
    merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumObjectClass<Extends>): YumObjectClass<YumMerge<Extends, Yum>>;
    nullable<Rule extends YumNullableRule>(rule: Rule): YumObjectClass<YumNullable<Rule, Yum>>;
    required<Rule extends YumRequiredRule>(rule: Rule): YumObjectClass<YumRequired<Rule, Yum>>;
    shape<Rule extends Record<string, {
        getSchema(): YumTypeBase;
    }>>(rule: Rule): YumObjectClass<YumShape<{
        [Key in keyof Rule]: ReturnType<Rule[Key]['getSchema']>;
    }, Yum>>;
}
export default function object(options?: YumOptions): YumObjectClass;
export declare function isObject(yum: unknown): yum is YumObjectClass<YumObjectBase>;
