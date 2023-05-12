import { is, partition } from '@drpiou/ts-utils';
import castArray from 'lodash/castArray';
import { YumInclude, YumIncludeAccept, YumIncludeBase, YumIncludeOptions, YumIncludeRule, YumTypeBase } from '../types';
import { isArray } from '../types/array';
import { isDate } from '../types/date';
import createError from '../utils/createError';
import makeValidatorRule from '../utils/makeValidatorRule';

export default function include<Yum extends YumIncludeAccept, Rule extends YumIncludeRule<Yum>>(
  rule: Rule[],
  yum: Yum,
  options?: YumIncludeOptions<Yum>,
): YumInclude<Rule, Yum> {
  return {
    ...yum,
    include: rule,
    _validateInclude: makeValidatorRule(
      (context, value, _options): void => {
        const throwError = () => {
          throw createError(
            `The :type field :label must be in the valid "${'rule'}" include.`,
            context,
            'include',
            rule,
            _options,
          );
        };

        if (isArray(context)) {
          const valueArray = [...castArray(value)];

          const [numberish, nullish] = partition(rule, (item, _index, reject) => {
            return is.asserted(item) ? item : reject;
          });

          let result = false;

          for (const _numberish of numberish) {
            const numberishTest = castArray(_numberish);

            let error = false;

            for (const _value of valueArray) {
              if (!numberishTest.includes(_value)) {
                error = true;

                break;
              }
            }

            if (!error) {
              result = true;

              break;
            }
          }

          if (!result && !nullish.includes(value as never)) {
            throwError();
          }
        } else {
          if (isDate(context)) {
            rule = rule.map((r) => (r as Date).getTime()) as never;
            value = (value as Date).getTime();
          }

          if (!rule.includes(value as never)) {
            throwError();
          }
        }
      },
      {
        messages: {
          include: options?.message,
        },
      },
    ),
  } as YumInclude<Rule, Yum>;
}

export function hasInclude(yum: YumTypeBase): yum is YumIncludeBase {
  return 'include' in yum;
}
