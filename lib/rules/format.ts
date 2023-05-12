import { is } from '@drpiou/ts-utils';
import { YumFormat, YumFormatAccept, YumFormatBase, YumFormatOptions, YumFormatRule, YumTypeBase } from '../types';
import createError from '../utils/createError';
import makeValidatorRule from '../utils/makeValidatorRule';

export default function format<Yum extends YumFormatAccept, Rule extends YumFormatRule>(
  rule: Rule,
  yum: Yum,
  options?: YumFormatOptions<Rule>,
): YumFormat<Rule, Yum> {
  return {
    ...yum,
    format: rule,
    _validateFormat: makeValidatorRule(
      (context, value, _options): void => {
        value = value.trim();

        let result = false;

        if (rule === 'date') {
          result = is.dateString(value);
        } else if (rule === 'email') {
          result = is.email(value);
        } else if (rule === 'ipv4') {
          result = is.ipv4(value);
        } else if (rule === 'ipv6') {
          result = is.ipv6(value);
        } else if (rule === 'phone') {
          result = is.phone(value);
        } else if (rule === 'url') {
          result = is.url(value, (options as YumFormatOptions<'url'> | undefined)?.protocol);
        } else if (rule === 'uuid') {
          result = is.uuid(value, (options as YumFormatOptions<'uuid'> | undefined)?.version);
        }

        if (!result) {
          throw createError(`The :type field :label must be in the valid "${rule}" format.`, context, 'format', rule, _options);
        }
      },
      {
        messages: {
          format: options?.message,
        },
      },
    ),
  };
}

export function hasFormat(yum: YumTypeBase): yum is YumFormatBase {
  return 'format' in yum;
}
