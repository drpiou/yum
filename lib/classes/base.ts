import _clone from '../rules/clone';
import _validate from '../rules/validate';
import _validateSync, { ValidateSyncReturnType } from '../rules/validateSync';
import {
  YumCustom,
  YumDefault,
  YumExtendsTypeBase,
  YumLabel,
  YumMerge,
  YumNullable,
  YumNullableRule,
  YumRequired,
  YumRequiredRule,
  YumTransform,
  YumTransformCallback,
  YumType,
  YumTypeBase,
  YumValidateOptions
} from '../types';

export abstract class YumBaseClass<Yum extends YumTypeBase> {
  protected abstract _yum: Yum;

  // get type(): Yum['type'] {
  //   return this._yum.type;
  // }

  // get default(): YumDefault<Yum> {
  //   return this._yum.default;
  // }

  getSchema(): Yum {
    return _clone(this._yum);
  }

  validate(value: any, options?: YumValidateOptions): YumDefault<Yum> {
    return _validate(this._yum, value, options);
  }

  validateSync(value: any, options?: YumValidateOptions): ValidateSyncReturnType<Yum> {
    return _validateSync(this._yum, value, options);
  }

  clone(): this {
    return new (this.constructor as new () => this)().apply(() => this.getSchema());
  }

  protected apply<Return = this>(callback: () => YumType): Return {
    this._yum = callback() as Yum;

    return this as never;
  }

  abstract label(label: string): YumBaseClass<YumLabel<Yum>>;

  abstract custom(custom: string): YumBaseClass<YumCustom<Yum>>;

  abstract transform(callback: YumTransformCallback<Yum>): YumBaseClass<YumTransform<Yum>>;

  abstract merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumBaseClass<Extends>): YumBaseClass<YumMerge<Extends, Yum>>;

  abstract nullable<Rule extends YumNullableRule>(rule: Rule): YumBaseClass<YumNullable<Rule, Yum>>;

  abstract required<Rule extends YumRequiredRule>(rule: Rule): YumBaseClass<YumRequired<Rule, Yum>>;
}
