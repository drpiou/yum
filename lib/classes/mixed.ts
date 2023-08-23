import _custom from '../rules/custom';
import _label from '../rules/label';
import _merge from '../rules/merge';
import _nullable from '../rules/nullable';
import _required from '../rules/required';
import _transform from '../rules/transform';
import { YumCustom, YumDefault, YumExtendsTypeBase, YumLabel, YumMerge, YumMixed, YumMixedBase, YumNullable, YumNullableRule, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback, YumTypeBase } from '../types';
import _mixed from '../types/mixed';
import _mixedOf from '../types/mixedOf';
import { YumBaseClass } from './base';

export class YumMixedClass<Yum extends YumMixedBase = YumMixed> extends YumBaseClass<Yum> {
  protected _yum: Yum;

  constructor() {
    super();

    this._yum = _mixed() as Yum;
  }

  static of<Of extends { getSchema(): YumTypeBase }[]>(
    of: Of,
  ): YumMixedClass<YumMixed<YumDefault<ReturnType<Of[number]['getSchema']>>>> {
    return new YumMixedClass().apply(() => _mixedOf(of.map((yum) => yum.getSchema())));
  }

  label(label: string): YumMixedClass<YumLabel<Yum>> {
    return this.apply(() => _label(label, this._yum));
  }

  custom(custom: string): YumMixedClass<YumCustom<Yum>> {
    return this.apply(() => _custom(custom, this._yum));
  }

  transform(callback: YumTransformCallback<Yum>): YumMixedClass<YumTransform<Yum>> {
    return this.apply(() => _transform(callback, this._yum));
  }

  merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumMixedClass<Extends>): YumMixedClass<YumMerge<Extends, Yum>> {
    return this.apply(() => _merge(merge.getSchema(), this._yum));
  }

  nullable<Rule extends YumNullableRule>(rule: Rule): YumMixedClass<YumNullable<Rule, Yum>> {
    return this.apply(() => _nullable(rule, this._yum));
  }

  required<Rule extends YumRequiredRule>(rule: Rule): YumMixedClass<YumRequired<Rule, Yum>> {
    return this.apply(() => _required(rule, this._yum));
  }
}

export default function mixed(): YumMixedClass {
  return new YumMixedClass();
}

export function isMixed(yum: unknown): yum is YumMixedClass<YumMixedBase> {
  return yum instanceof YumMixedClass;
}
