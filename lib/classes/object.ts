import mapValues from 'lodash/mapValues';
import _custom from '../rules/custom';
import _label from '../rules/label';
import _merge from '../rules/merge';
import _nullable from '../rules/nullable';
import _required from '../rules/required';
import _shape from '../rules/shape';
import _transform from '../rules/transform';
import { YumCustom, YumExtendsTypeBase, YumLabel, YumMerge, YumNullable, YumNullableRule, YumObject, YumObjectBase, YumOptions, YumRequired, YumRequiredRule, YumShape, YumTransform, YumTransformCallback, YumTypeBase } from '../types';
import _object from '../types/object';
import { YumBaseClass } from './base';

export class YumObjectClass<Yum extends YumObjectBase = YumObject> extends YumBaseClass<Yum> {
  protected _yum: Yum;

  constructor(options?: YumOptions) {
    super();

    this._yum = _object(options) as Yum;
  }

  label(label: string): YumObjectClass<YumLabel<Yum>> {
    return this.apply(() => _label(label, this._yum));
  }

  custom(custom: string): YumObjectClass<YumCustom<Yum>> {
    return this.apply(() => _custom(custom, this._yum));
  }

  transform(callback: YumTransformCallback<Yum>): YumObjectClass<YumTransform<Yum>> {
    return this.apply(() => _transform(callback, this._yum));
  }

  merge<Extends extends YumExtendsTypeBase<Yum>>(merge: YumObjectClass<Extends>): YumObjectClass<YumMerge<Extends, Yum>> {
    return this.apply(() => _merge(merge.getSchema(), this._yum));
  }

  nullable<Rule extends YumNullableRule>(rule: Rule): YumObjectClass<YumNullable<Rule, Yum>> {
    return this.apply(() => _nullable(rule, this._yum));
  }

  required<Rule extends YumRequiredRule>(rule: Rule): YumObjectClass<YumRequired<Rule, Yum>> {
    return this.apply(() => _required(rule, this._yum));
  }

  shape<Rule extends Record<string, { getSchema(): YumTypeBase }>>(
    rule: Rule,
  ): YumObjectClass<YumShape<{ [Key in keyof Rule]: ReturnType<Rule[Key]['getSchema']> }, Yum>> {
    return this.apply(() =>
      _shape(
        mapValues(rule, (r) => r.getSchema()),
        this._yum,
      ),
    );
  }
}

export default function object(options?: YumOptions): YumObjectClass {
  return new YumObjectClass(options);
}

export function isObject(yum: unknown): yum is YumObjectClass<YumObjectBase> {
  return yum instanceof YumObjectClass;
}
