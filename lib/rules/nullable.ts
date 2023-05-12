import { YumNullable, YumNullableAccept, YumNullableBase, YumNullableOptions, YumNullableRule, YumTypeBase } from '../types';
import createError from '../utils/createError';
import makeValidatorRule from '../utils/makeValidatorRule';

export default function nullable<Yum extends YumNullableAccept, Rule extends YumNullableRule>(
  rule: Rule,
  yum: Yum,
  options?: YumNullableOptions,
): YumNullable<Rule, Yum> {
  return {
    ...yum,
    nullable: rule,
    _validateNullable: makeValidatorRule(
      (context, value, _options): void => {
        if (value === null && !rule) {
          throw createError('The field :label cannot be null.', context, 'nullable', rule, _options);
        }
      },
      {
        messages: {
          nullable: options?.message,
        },
      },
    ),
  } as YumNullable<Rule, Yum>;
}

export function hasNullable(yum: YumTypeBase): yum is YumNullableBase {
  return 'nullable' in yum;
}
