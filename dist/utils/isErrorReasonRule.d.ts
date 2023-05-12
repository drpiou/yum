import { Asserted } from '@drpiou/ts-utils';
import { YumErrorReason, YumMessageRule } from '../types';
export default function isErrorReasonRule<Rule extends YumMessageRule>(error: unknown, rule: Rule): error is Asserted<YumErrorReason<Rule>>;
