import _include from '../rules/include';
import _label from '../rules/label';
import _merge from '../rules/merge';
import _nullable from '../rules/nullable';
import _of from '../rules/of';
import _range from '../rules/range';
import _required from '../rules/required';
import _transform from '../rules/transform';
import {
  YumArray,
  YumArrayBase,
  YumExtendsTypeBase,
  YumInclude,
  YumIncludeRule,
  YumLabel,
  YumMerge,
  YumNullable,
  YumNullableRule,
  YumOf,
  YumOfRule,
  YumOptions,
  YumRange,
  YumRangeRule,
  YumRequired,
  YumRequiredRule,
  YumTransform,
  YumTransformCallback,
} from '../types';
import _array from '../types/array';
import { YumBaseClass } from './base';

export class YumArrayClass<Yum extends YumArrayBase = YumArray> extends YumBaseClass<Yum> {
  protected _yum: Yum;

  constructor(options?: YumOptions) {
    super();

    this._yum = _array(options) as Yum;
  }

  label(label: string): YumArrayClass<YumLabel<Yum>> {
    return this.apply(() => _label(label, this._yum));
  }

  transform(callback: YumTransformCallback<Yum>): YumArrayClass<YumTransform<Yum>> {
    return this.apply(() => _transform(callback, this._yum));
  }

  merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumArrayClass<Extends>): YumArrayClass<YumMerge<Extends, Yum>> {
    return this.apply(() => _merge(merge.getSchema(), this._yum));
  }

  nullable<Rule extends YumNullableRule>(rule: Rule): YumArrayClass<YumNullable<Rule, Yum>> {
    return this.apply(() => _nullable(rule, this._yum));
  }

  required<Rule extends YumRequiredRule>(rule: Rule): YumArrayClass<YumRequired<Rule, Yum>> {
    return this.apply(() => _required(rule, this._yum));
  }

  of<Rule extends { getSchema(): YumOfRule }>(rule: Rule): YumArrayClass<YumOf<ReturnType<Rule['getSchema']>, Yum>> {
    return this.apply(() => _of(rule.getSchema(), this._yum));
  }

  range<Rule extends YumRangeRule>(rule: Rule): YumArrayClass<YumRange<Rule, Yum>> {
    return this.apply(() => _range(rule, this._yum));
  }

  include<Rule extends YumIncludeRule<Yum>>(rule: Rule[]): YumArrayClass<YumInclude<Rule, Yum>> {
    return this.apply(() => _include(rule as YumIncludeRule<Yum>[], this._yum));
  }
}

export default function array(options?: YumOptions): YumArrayClass {
  return new YumArrayClass(options);
}

export function isArray(yum: unknown): yum is YumArrayClass<YumArrayBase> {
  return yum instanceof YumArrayClass;
}
