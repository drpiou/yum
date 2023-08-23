import _custom from '../rules/custom';
import _include from '../rules/include';
import _label from '../rules/label';
import _merge from '../rules/merge';
import _nullable from '../rules/nullable';
import _range from '../rules/range';
import _required from '../rules/required';
import _transform from '../rules/transform';
import { YumCustom, YumDate, YumDateBase, YumExtendsTypeBase, YumInclude, YumIncludeRule, YumLabel, YumMerge, YumNullable, YumNullableRule, YumOptions, YumRange, YumRangeRule, YumRequired, YumRequiredRule, YumTransform, YumTransformCallback } from '../types';
import _date from '../types/date';
import { YumBaseClass } from './base';

export class YumDateClass<Yum extends YumDateBase = YumDate> extends YumBaseClass<Yum> {
  protected _yum: Yum;

  constructor(options?: YumOptions) {
    super();

    this._yum = _date(options) as Yum;
  }

  label(label: string): YumDateClass<YumLabel<Yum>> {
    return this.apply(() => _label(label, this._yum));
  }

  custom(custom: string): YumDateClass<YumCustom<Yum>> {
    return this.apply(() => _custom(custom, this._yum));
  }

  transform(callback: YumTransformCallback<Yum>): YumDateClass<YumTransform<Yum>> {
    return this.apply(() => _transform(callback, this._yum));
  }

  merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumDateClass<Extends>): YumDateClass<YumMerge<Extends, Yum>> {
    return this.apply(() => _merge(merge.getSchema(), this._yum));
  }

  nullable<Rule extends YumNullableRule>(rule: Rule): YumDateClass<YumNullable<Rule, Yum>> {
    return this.apply(() => _nullable(rule, this._yum));
  }

  required<Rule extends YumRequiredRule>(rule: Rule): YumDateClass<YumRequired<Rule, Yum>> {
    return this.apply(() => _required(rule, this._yum));
  }

  range<Rule extends YumRangeRule>(rule: Rule): YumDateClass<YumRange<Rule, Yum>> {
    return this.apply(() => _range(rule, this._yum));
  }

  include<Rule extends YumIncludeRule<Yum>>(rule: Rule[]): YumDateClass<YumInclude<Rule, Yum>> {
    return this.apply(() => _include(rule, this._yum));
  }
}

export default function date(options?: YumOptions): YumDateClass {
  return new YumDateClass(options);
}

export function isDate(yum: unknown): yum is YumDateClass<YumDateBase> {
  return yum instanceof YumDateClass;
}
