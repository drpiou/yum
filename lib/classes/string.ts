import _format from '../rules/format';
import _include from '../rules/include';
import _label from '../rules/label';
import _merge from '../rules/merge';
import _nullable from '../rules/nullable';
import _range from '../rules/range';
import _regex from '../rules/regex';
import _required from '../rules/required';
import _transform from '../rules/transform';
import {
  YumExtendsTypeBase,
  YumFormat,
  YumFormatOptions,
  YumFormatRule,
  YumInclude,
  YumIncludeRule,
  YumLabel,
  YumMerge,
  YumNullable,
  YumNullableRule,
  YumOptions,
  YumRange,
  YumRangeRule,
  YumRegex,
  YumRegexRule,
  YumRequired,
  YumRequiredRule,
  YumString,
  YumStringBase,
  YumTransform,
  YumTransformCallback,
} from '../types';
import _string from '../types/string';
import { YumBaseClass } from './base';

export class YumStringClass<Yum extends YumStringBase = YumString> extends YumBaseClass<Yum> {
  protected _yum: Yum;

  constructor(options?: YumOptions) {
    super();

    this._yum = _string(options) as Yum;
  }

  label(label: string): YumStringClass<YumLabel<Yum>> {
    return this.apply(() => _label(label, this._yum));
  }

  transform(callback: YumTransformCallback<Yum>): YumStringClass<YumTransform<Yum>> {
    return this.apply(() => _transform(callback, this._yum));
  }

  merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumStringClass<Extends>): YumStringClass<YumMerge<Extends, Yum>> {
    return this.apply(() => _merge(merge.getSchema(), this._yum));
  }

  nullable<Rule extends YumNullableRule>(rule: Rule): YumStringClass<YumNullable<Rule, Yum>> {
    return this.apply(() => _nullable(rule, this._yum));
  }

  required<Rule extends YumRequiredRule>(rule: Rule): YumStringClass<YumRequired<Rule, Yum>> {
    return this.apply(() => _required(rule, this._yum));
  }

  range<Rule extends YumRangeRule>(rule: Rule): YumStringClass<YumRange<Rule, Yum>> {
    return this.apply(() => _range(rule, this._yum));
  }

  regex<Rule extends YumRegexRule>(rule: Rule): YumStringClass<YumRegex<Rule, Yum>> {
    return this.apply(() => _regex(rule, this._yum));
  }

  format<Rule extends YumFormatRule>(rule: Rule, options?: YumFormatOptions<Rule>): YumStringClass<YumFormat<Rule, Yum>> {
    return this.apply(() => _format(rule, this._yum, options));
  }

  include<Rule extends YumIncludeRule<Yum>>(rule: Rule[]): YumStringClass<YumInclude<Rule, Yum>> {
    return this.apply(() => _include(rule, this._yum));
  }
}

export default function string(options?: YumOptions): YumStringClass {
  return new YumStringClass(options);
}

export function isString(yum: unknown): yum is YumStringClass<YumStringBase> {
  return yum instanceof YumStringClass;
}
