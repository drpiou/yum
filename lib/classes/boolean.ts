import _custom from '../rules/custom';
import _label from '../rules/label';
import _merge from '../rules/merge';
import _nullable from '../rules/nullable';
import _required from '../rules/required';
import _transform from '../rules/transform';
import { YumBoolean, YumBooleanBase, YumCustom, YumExtendsTypeBase, YumLabel, YumMerge, YumNullable, YumNullableRule, YumOptions, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback } from '../types';
import _boolean from '../types/boolean';
import { YumBaseClass } from './base';

export class YumBooleanClass<Yum extends YumBooleanBase = YumBoolean> extends YumBaseClass<Yum> {
  protected _yum: Yum;

  constructor(options?: YumOptions) {
    super();

    this._yum = _boolean(options) as Yum;
  }

  label(label: string): YumBooleanClass<YumLabel<Yum>> {
    return this.apply(() => _label(label, this._yum));
  }

  custom(custom: string): YumBooleanClass<YumCustom<Yum>> {
    return this.apply(() => _custom(custom, this._yum));
  }

  transform(callback: YumTransformCallback<Yum>): YumBooleanClass<YumTransform<Yum>> {
    return this.apply(() => _transform(callback, this._yum));
  }

  merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumBooleanClass<Extends>): YumBooleanClass<YumMerge<Extends, Yum>> {
    return this.apply(() => _merge(merge.getSchema(), this._yum));
  }

  nullable<Rule extends YumNullableRule>(rule: Rule): YumBooleanClass<YumNullable<Rule, Yum>> {
    return this.apply(() => _nullable(rule, this._yum));
  }

  required<Rule extends YumRequiredRule>(rule: Rule): YumBooleanClass<YumRequired<Rule, Yum>> {
    return this.apply(() => _required(rule, this._yum));
  }
}

export default function boolean(options?: YumOptions): YumBooleanClass {
  return new YumBooleanClass(options);
}

export function isBoolean(yum: unknown): yum is YumBooleanClass<YumBooleanBase> {
  return yum instanceof YumBooleanClass;
}
