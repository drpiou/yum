import { filterNullish } from '@drpiou/ts-utils';
import { YumOf, YumOfAccept, YumOfBase, YumOfRule, YumTypeBase } from '../types';
import validateMany from '../utils/validateMany';
import validate from './validate';

export default function of<Yum extends YumOfAccept, Rule extends YumOfRule>(rule: Rule, yum: Yum): YumOf<Rule, Yum> {
  return {
    ...yum,
    of: rule,
    _validateOf: (context, value, options) => {
      const conditions = [];

      const result: unknown[] = [];

      let index = 0;

      for (const _value of value) {
        conditions.push(() => {
          result.push(validate(rule, _value, { ...options, path: filterNullish([options?.path, index]).join('.') }));
        });

        index++;
      }

      validateMany(conditions, options);

      return result;
    },
  } as YumOf<Rule, Yum>;
}

export function hasOf(yum: YumTypeBase): yum is YumOfBase {
  return 'of' in yum;
}
