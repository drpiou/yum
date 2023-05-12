import { Asserted } from '@drpiou/ts-utils';
import { YumErrorReason, YumMessageRule } from '../types';
import isErrorReason from './isErrorReason';

export default function isErrorReasonRule<Rule extends YumMessageRule>(
  error: unknown,
  rule: Rule,
): error is Asserted<YumErrorReason<Rule>> {
  return isErrorReason(error) && error.rule === rule;
}
