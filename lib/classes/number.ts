import _custom from '../rules/custom';
import _include from '../rules/include';
import _label from '../rules/label';
import _merge from '../rules/merge';
import _nullable from '../rules/nullable';
import _range from '../rules/range';
import _required from '../rules/required';
import _transform from '../rules/transform';
import { YumCustom, YumExtendsTypeBase, YumInclude, YumIncludeRule, YumLabel, YumMerge, YumNullable, YumNullableRule, YumNumber, YumNumberBase, YumOptions, YumRange, YumRangeRule, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback } from '../types';
import _number from '../types/number';
import { YumBaseClass } from './base';

export class YumNumberClass<Yum extends YumNumberBase = YumNumber> extends YumBaseClass<Yum> {
  protected _yum: Yum;

  constructor(options?: YumOptions) {
    super();

    this._yum = _number(options) as Yum;
  }

  label(label: string): YumNumberClass<YumLabel<Yum>> {
    return this.apply(() => _label(label, this._yum));
  }

  custom(custom: string): YumNumberClass<YumCustom<Yum>> {
    return this.apply(() => _custom(custom, this._yum));
  }

  transform(callback: YumTransformCallback<Yum>): YumNumberClass<YumTransform<Yum>> {
    return this.apply(() => _transform(callback, this._yum));
  }

  merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumNumberClass<Extends>): YumNumberClass<YumMerge<Extends, Yum>> {
    return this.apply(() => _merge(merge.getSchema(), this._yum));
  }

  nullable<Rule extends YumNullableRule>(rule: Rule): YumNumberClass<YumNullable<Rule, Yum>> {
    return this.apply(() => _nullable(rule, this._yum));
  }

  required<Rule extends YumRequiredRule>(rule: Rule): YumNumberClass<YumRequired<Rule, Yum>> {
    return this.apply(() => _required(rule, this._yum));
  }

  range<Rule extends YumRangeRule>(rule: Rule): YumNumberClass<YumRange<Rule, Yum>> {
    return this.apply(() => _range(rule, this._yum));
  }

  include<Rule extends YumIncludeRule<Yum>>(rule: Rule[]): YumNumberClass<YumInclude<Rule, Yum>> {
    return this.apply(() => _include(rule, this._yum));
  }
}

export default function number(options?: YumOptions): YumNumberClass {
  return new YumNumberClass(options);
}

export function isNumber(yum: unknown): yum is YumNumberClass<YumNumberBase> {
  return yum instanceof YumNumberClass;
}
