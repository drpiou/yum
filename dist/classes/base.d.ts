import { ValidateSyncReturnType } from '../rules/validateSync';
import { YumCustom, YumDefault, YumExtendsTypeBase, YumLabel, YumMerge, YumNullable, YumNullableRule, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback, YumType, YumTypeBase, YumValidateOptions } from '../types';
export declare abstract class YumBaseClass<Yum extends YumTypeBase> {
    protected abstract _yum: Yum;
    getSchema(): Yum;
    validate(value: any, options?: YumValidateOptions): YumDefault<Yum>;
    validateSync(value: any, options?: YumValidateOptions): ValidateSyncReturnType<Yum>;
    clone(): this;
    protected apply<Return = this>(callback: () => YumType): Return;
    abstract label(label: string): YumBaseClass<YumLabel<Yum>>;
    abstract custom(custom: string): YumBaseClass<YumCustom<Yum>>;
    abstract transform(callback: YumTransformCallback<Yum>): YumBaseClass<YumTransform<Yum>>;
    abstract merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumBaseClass<Extends>): YumBaseClass<YumMerge<Extends, Yum>>;
    abstract nullable<Rule extends YumNullableRule>(rule: Rule): YumBaseClass<YumNullable<Rule, Yum>>;
    abstract required<Rule extends YumRequiredRule>(rule: Rule): YumBaseClass<YumRequired<Rule, Yum>>;
}
