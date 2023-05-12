import { YumRequired, YumRequiredAccept, YumRequiredBase, YumRequiredOptions, YumRequiredRule, YumTypeBase } from '../types';
import createError from '../utils/createError';
import makeValidator from '../utils/makeValidator';

export default function required<Yum extends YumRequiredAccept, Rule extends YumRequiredRule>(
  rule: Rule,
  yum: Yum,
  options?: YumRequiredOptions,
): YumRequired<Rule, Yum> {
  return {
    ...yum,
    required: rule,
    _validateRequired: makeValidator(
      (context, value, _options): void => {
        if (value === undefined && rule) {
          throw createError('The field :label is required.', context, 'required', rule, _options);
        }
      },
      {
        messages: {
          required: options?.message,
        },
      },
    ),
  } as YumRequired<Rule, Yum>;
}

export function hasRequired(yum: YumTypeBase): yum is YumRequiredBase {
  return 'required' in yum;
}
