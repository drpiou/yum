import clone from './rules/clone';
import custom, { hasCustom } from './rules/custom';
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
export declare const yumRules: {
    clone: typeof clone;
    custom: typeof custom;
    format: typeof format;
    hasCustom: typeof hasCustom;
    hasFormat: typeof hasFormat;
    hasInclude: typeof hasInclude;
    hasLabel: typeof hasLabel;
    hasNullable: typeof hasNullable;
    hasOf: typeof hasOf;
    hasOr: typeof hasOr;
    hasRange: typeof hasRange;
    hasRegex: typeof hasRegex;
    hasRequired: typeof hasRequired;
    hasShape: typeof hasShape;
    hasTransform: typeof hasTransform;
    include: typeof include;
    label: typeof label;
    merge: typeof merge;
    nullable: typeof nullable;
    of: typeof of;
    or: typeof or;
    range: typeof range;
    regex: typeof regex;
    required: typeof required;
    shape: typeof shape;
    transform: typeof transform;
    validate: typeof validate;
    validateSync: typeof validateSync;
};
