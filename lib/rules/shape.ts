import { filterNullish } from '@drpiou/ts-utils';
import { YumShape, YumShapeAccept, YumShapeBase, YumShapeRule, YumTypeBase } from '../types';
import validateMany from '../utils/validateMany';
import validate from './validate';

export default function shape<Yum extends YumShapeAccept, Rule extends YumShapeRule>(rule: Rule, yum: Yum): YumShape<Rule, Yum> {
  return {
    ...yum,
    shape: rule,
    _validateShape: (context, value, options) => {
      const conditions = [];

      for (const key in rule) {
        const _rule = rule[key];
        const _value = value[key];

        conditions.push(() => {
          value[key] = validate(_rule, _value, { ...options, path: filterNullish([options?.path, key]).join('.') });
        });
      }

      validateMany(conditions, options);

      return value;
    },
  } as YumShape<Rule, Yum>;
}

export function hasShape(yum: YumTypeBase): yum is YumShapeBase {
  return 'shape' in yum;
}
