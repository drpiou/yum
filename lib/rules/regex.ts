import { YumRegex, YumRegexAccept, YumRegexBase, YumRegexOptions, YumRegexRule, YumTypeBase } from '../types';
import createError from '../utils/createError';
import makeValidatorRule from '../utils/makeValidatorRule';

export default function regex<Yum extends YumRegexAccept, Rule extends YumRegexRule>(
  rule: Rule,
  yum: Yum,
  options?: YumRegexOptions,
): YumRegex<Rule, Yum> {
  return {
    ...yum,
    regex: rule,
    _validateRegex: makeValidatorRule(
      (context, value, _options): void => {
        if (!rule.test(value)) {
          throw createError('The :type field :label must be in the valid regex format.', context, 'regex', rule, _options);
        }
      },
      {
        messages: {
          regex: options?.message,
        },
      },
    ),
  };
}

export function hasRegex(yum: YumTypeBase): yum is YumRegexBase {
  return 'regex' in yum;
}
