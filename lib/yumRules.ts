import clone from './rules/clone';
import format, { hasFormat } from './rules/format';
import include, { hasInclude } from './rules/include';
import label, { hasLabel } from './rules/label';
import merge from './rules/merge';
import nullable, { hasNullable } from './rules/nullable';
import of, { hasOf } from './rules/of';
import or, { hasOr } from './rules/or';
import range, { hasRange } from './rules/range';
import regex, { hasRegex } from './rules/regex';
import required, { hasRequired } from './rules/required';
import shape, { hasShape } from './rules/shape';
import transform, { hasTransform } from './rules/transform';
import validate from './rules/validate';
import validateSync from './rules/validateSync';

export const yumRules = {
  clone,
  format,
  hasFormat,
  hasInclude,
  hasLabel,
  hasNullable,
  hasOf,
  hasOr,
  hasRange,
  hasRegex,
  hasRequired,
  hasShape,
  hasTransform,
  include,
  label,
  merge,
  nullable,
  of,
  or,
  range,
  regex,
  required,
  shape,
  transform,
  validate,
  validateSync,
};
