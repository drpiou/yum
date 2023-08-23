import YumError from '../error';
import { YumMessageConditions, YumMessageRule, YumTypeBase, YumValidateOptions } from '../types';
export default function createError<Rule extends YumMessageRule>(message: string, context: YumTypeBase, rule: Rule, condition?: YumMessageConditions[Rule], options?: YumValidateOptions): YumError;
