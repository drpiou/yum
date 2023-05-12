import { is } from '@drpiou/ts-utils';
import find from 'lodash/find';
import { YumRange, YumRangeAccept, YumRangeBase, YumRangeOptions, YumRangeRule, YumRangeValue, YumTypeBase } from '../types';
import createError from '../utils/createError';
import makeValidatorRule from '../utils/makeValidatorRule';

export default function range<Yum extends YumRangeAccept, Rule extends YumRangeRule>(
  rule: Rule,
  yum: Yum,
  options?: YumRangeOptions,
): YumRange<Rule, Yum> {
  return {
    ...yum,
    range: rule,
    _validateRange: makeValidatorRule(
      (context, value, _options): void => {
        const conditions: string[] = [];

        const rangeItems = is.array(rule[0]) ? (rule as YumRangeValue[]) : [rule as YumRangeValue];

        const result = find(rangeItems, (rangeItem) => {
          const min = rangeItem[0];
          const max = rangeItem[1];

          const condition: string[] = [];

          if (is.number(min)) condition.push(`greater or equal than ${min}`);
          if (is.number(max)) condition.push(`less or equal than ${max}`);
          if (condition.length) conditions.push(condition.join(' and '));

          return (!is.asserted(min) || value >= min) && (!is.asserted(max) || value <= max);
        });

        if (result === undefined) {
          throw createError(`The :type field :label must be ${conditions.join(' or ')}.`, context, 'range', rangeItems, _options);
        }
      },
      {
        messages: {
          range: options?.message,
        },
      },
    ),
  };
}

export function hasRange(yum: YumTypeBase): yum is YumRangeBase {
  return 'range' in yum;
}
