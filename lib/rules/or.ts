import { YumOr, YumOrAccept, YumOrBase, YumOrRule, YumTypeBase } from '../types';
import throwIfAll from '../utils/throwIfAll';
import validate from './validate';

const empty = Symbol('empty');

export default function or<Yum extends YumOrAccept, Rule extends YumOrRule>(rule: Rule, yum: Yum): YumOr<Rule, Yum> {
  return {
    ...yum,
    or: rule,
    _validateOr: (context, value, options) => {
      const conditions = [];

      let result: unknown = empty;

      for (const _rule of rule) {
        conditions.push(() => {
          const _value = validate(_rule, value, options);

          const match = typeof value === typeof _value;

          if (match || result === empty) {
            result = _value;
          }

          return match;
        });
      }

      throwIfAll(conditions);

      return result;
    },
  } as YumOr<Rule, Yum>;
}

export function hasOr(yum: YumTypeBase): yum is YumOrBase {
  return 'or' in yum;
}
