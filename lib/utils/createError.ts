import YumError from '../error';
import { hasLabel } from '../rules/label';
import { YumErrorReason, YumMessageConditions, YumMessageRule, YumTypeBase, YumValidateOptions } from '../types';
import makeError from './makeError';

export default function createError<Rule extends YumMessageRule>(
  message: string,
  context: YumTypeBase,
  rule: Rule,
  condition?: YumMessageConditions[Rule],
  options?: YumValidateOptions,
): YumError {
  const label = hasLabel(context) ? `${context.label.trim()} ` : '';

  const reason = {
    label,
    message,
    path: options?.path,
    type: context.type,
    rule,
    condition,
  } as YumErrorReason<Rule>;

  const messageRule = options?.messages?.[rule] ?? message;

  reason.message = typeof messageRule === 'function' ? messageRule(reason) : messageRule;

  reason.message = reason.message.replaceAll(':type', context.type);
  reason.message = reason.message.replaceAll(':label ', label);

  return makeError(undefined, reason);
}
