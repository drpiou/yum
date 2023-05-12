import { describe, test } from 'vitest';
import {
  YumArray,
  YumBoolean,
  YumDate,
  YumFormat,
  YumFormatRule,
  YumInclude,
  YumLabel,
  YumMerge,
  YumMixed,
  YumNullable,
  YumNumber,
  YumObject,
  YumOf,
  YumOr,
  YumRange,
  YumRangeRule,
  YumRegex,
  YumRegexRule,
  YumRequired,
  YumShape,
  YumShapeRule,
  YumString,
  YumTransform,
  YumType,
  YumValidate,
} from './types';

describe('types', () => {
  test('import', () => {
    const __yum_base = {} as YumType;
    const __yum_base_default = __yum_base.default;

    // ####################

    const __yum_mixed = {} as YumMixed;
    const __yum_mixed_type = __yum_mixed.type;
    const __yum_mixed_default = __yum_mixed.default;

    // ####################

    const __yum_string = {} as YumString;
    const __yum_string_type = __yum_string.type;
    const __yum_string_default = __yum_string.default;

    // ####################

    const __yum_number = {} as YumNumber;
    const __yum_number_type = __yum_number.type;
    const __yum_number_default = __yum_number.default;

    // ####################

    const __yum_boolean = {} as YumBoolean;
    const __yum_boolean_type = __yum_boolean.type;
    const __yum_boolean_default = __yum_boolean.default;

    // ####################

    const __yum_date = {} as YumDate;
    const __yum_date_type = __yum_date.type;
    const __yum_date_default = __yum_date.default;

    // ####################

    const __yum_array = {} as YumArray;
    const __yum_array_type = __yum_array.type;
    const __yum_array_default = __yum_array.default;

    const __yum_array_string = {} as YumArray<YumString>;
    const __yum_array_string_type = __yum_array_string.type;
    const __yum_array_string_default = __yum_array_string.default;

    const __yum_array_number = {} as YumArray<YumNumber>;
    const __yum_array_number_type = __yum_array_number.type;
    const __yum_array_number_default = __yum_array_number.default;

    // ####################

    const __yum_object = {} as YumObject;
    const __yum_object_type = __yum_object.type;
    const __yum_object_default = __yum_object.default;

    // ####################

    const __yum_label_true = {} as YumLabel<YumString>;
    const __yum_label_true_type = __yum_label_true.type;
    const __yum_label_true_default = __yum_label_true.default;
    const __yum_label_true_label = __yum_label_true.label;

    // ####################

    const __yum_transform_true = {} as YumTransform<YumString>;
    const __yum_transform_true_type = __yum_transform_true.type;
    const __yum_transform_true_default = __yum_transform_true.default;
    const __yum_transform_true_transform = __yum_transform_true.transform;

    // ####################

    const __yum_nullable_true = {} as YumNullable<true, YumString>;
    const __yum_nullable_true_type = __yum_nullable_true.type;
    const __yum_nullable_true_default = __yum_nullable_true.default;
    const __yum_nullable_true_nullable = __yum_nullable_true.nullable;

    const __yum_nullable_true_required_true = {} as YumNullable<true, YumRequired<true, YumString>>;
    const __yum_nullable_true_required_true_type = __yum_nullable_true_required_true.type;
    const __yum_nullable_true_required_true_default = __yum_nullable_true_required_true.default;
    const __yum_nullable_true_required_true_required = __yum_nullable_true_required_true.required;

    const __yum_nullable_true_required_false = {} as YumNullable<true, YumRequired<false, YumString>>;
    const __yum_nullable_true_required_false_type = __yum_nullable_true_required_false.type;
    const __yum_nullable_true_required_false_default = __yum_nullable_true_required_false.default;
    const __yum_nullable_true_required_false_required = __yum_nullable_true_required_false.required;

    const __yum_nullable_false = {} as YumNullable<false, YumString>;
    const __yum_nullable_false_type = __yum_nullable_false.type;
    const __yum_nullable_false_default = __yum_nullable_false.default;
    const __yum_nullable_false_nullable = __yum_nullable_false.nullable;

    const __yum_nullable_false_required_true = {} as YumNullable<false, YumRequired<true, YumString>>;
    const __yum_nullable_false_required_true_type = __yum_nullable_false_required_true.type;
    const __yum_nullable_false_required_true_default = __yum_nullable_false_required_true.default;
    const __yum_nullable_false_required_true_required = __yum_nullable_false_required_true.required;

    const __yum_nullable_false_required_false = {} as YumNullable<false, YumRequired<false, YumString>>;
    const __yum_nullable_false_required_false_type = __yum_nullable_false_required_false.type;
    const __yum_nullable_false_required_false_default = __yum_nullable_false_required_false.default;
    const __yum_nullable_false_required_false_required = __yum_nullable_false_required_false.required;

    // ####################

    const __yum_required_true = {} as YumRequired<true, YumString>;
    const __yum_required_true_type = __yum_required_true.type;
    const __yum_required_true_default = __yum_required_true.default;
    const __yum_required_true_required = __yum_required_true.required;

    const __yum_required_true_nullable_true = {} as YumRequired<true, YumNullable<true, YumString>>;
    const __yum_required_true_nullable_true_type = __yum_required_true_nullable_true.type;
    const __yum_required_true_nullable_true_default = __yum_required_true_nullable_true.default;
    const __yum_required_true_nullable_true_required = __yum_required_true_nullable_true.required;

    const __yum_required_true_nullable_false = {} as YumRequired<true, YumNullable<false, YumString>>;
    const __yum_required_true_nullable_false_type = __yum_required_true_nullable_false.type;
    const __yum_required_true_nullable_false_default = __yum_required_true_nullable_false.default;
    const __yum_required_true_nullable_false_required = __yum_required_true_nullable_false.required;

    const __yum_required_false = {} as YumRequired<false, YumString>;
    const __yum_required_false_type = __yum_required_false.type;
    const __yum_required_false_default = __yum_required_false.default;
    const __yum_required_false_required = __yum_required_false.required;

    const __yum_required_false_nullable_true = {} as YumRequired<false, YumNullable<true, YumString>>;
    const __yum_required_false_nullable_true_type = __yum_required_false_nullable_true.type;
    const __yum_required_false_nullable_true_default = __yum_required_false_nullable_true.default;
    const __yum_required_false_nullable_true_required = __yum_required_false_nullable_true.required;

    const __yum_required_false_nullable_false = {} as YumRequired<false, YumNullable<false, YumString>>;
    const __yum_required_false_nullable_false_type = __yum_required_false_nullable_false.type;
    const __yum_required_false_nullable_false_default = __yum_required_false_nullable_false.default;
    const __yum_required_false_nullable_false_required = __yum_required_false_nullable_false.required;

    // ####################

    const __yum_range = {} as YumRange<YumRangeRule, YumString>;
    const __yum_range_type = __yum_range.type;
    const __yum_range_default = __yum_range.default;
    const __yum_range_range = __yum_range.range;

    // ####################

    const __yum_regex = {} as YumRegex<YumRegexRule, YumString>;
    const __yum_regex_type = __yum_regex.type;
    const __yum_regex_default = __yum_regex.default;
    const __yum_regex_regex = __yum_regex.regex;

    // ####################

    const __yum_format = {} as YumFormat<YumFormatRule, YumString>;
    const __yum_format_type = __yum_format.type;
    const __yum_format_default = __yum_format.default;
    const __yum_format_format = __yum_format.format;

    // ####################

    const __yum_or = {} as YumRequired<true, YumNullable<true, YumOr<[YumInclude<'3', YumString>, YumNumber], YumMixed>>>;
    const __yum_or_type = __yum_or.type;
    const __yum_or_default = __yum_or.default;
    const __yum_or_or = __yum_or.or;

    // ####################

    const __yum_of = {} as YumOf<YumRequired<true, YumNullable<true, YumString>>, YumRequired<true, YumNullable<true, YumArray>>>;
    const __yum_of_type = __yum_of.type;
    const __yum_of_default = __yum_of.default;
    const __yum_of_of = __yum_of.of;

    const __yum_of_or = {} as YumOf<
      YumRequired<true, YumNullable<true, YumOr<[YumInclude<'3', YumString>, YumNumber], YumMixed>>>,
      YumRequired<true, YumNullable<true, YumArray>>
    >;
    const __yum_of_or_type = __yum_of_or.type;
    const __yum_of_or_default = __yum_of_or.default;
    const __yum_of_or_of = __yum_of_or.of;

    // ####################

    const __yum_shape = {} as YumShape<YumShapeRule, YumObject>;
    const __yum_shape_type = __yum_shape.type;
    const __yum_shape_default = __yum_shape.default;
    const __yum_shape_shape = __yum_shape.shape;

    // ####################

    // const __yum_include = {} as YumNullable<true, YumInclude<'3', YumString>>;
    const __yum_include = {} as YumInclude<'3', YumNullable<true, YumString>>;
    const __yum_include_type = __yum_include.type;
    const __yum_include_default = __yum_include.default;
    const __yum_include_include = __yum_include.include;

    // ####################

    const __yum_merge = {} as YumMerge<YumNullable<true, YumString>, YumString>;
    const __yum_merge_type = __yum_merge.type;
    const __yum_merge_default = __yum_merge.default;
    const __yum_merge_nullable = __yum_merge.nullable;

    // ####################

    const __yum_validate_string = {} as YumValidate<YumString>;
    const __yum_validate_string_include = {} as YumValidate<YumInclude<'3' | '4', YumString>>;
    const __yum_validate_number = {} as YumValidate<YumNumber>;
    const __yum_validate_boolean = {} as YumValidate<YumBoolean>;
    const __yum_validate_date = {} as YumValidate<YumDate>;
    const __yum_validate_array = {} as YumValidate<YumArray>;
    const __yum_validate_array_string = {} as YumValidate<YumArray<YumString>>;
    const __yum_validate_array_number = {} as YumValidate<YumArray<YumNumber>>;
    const __yum_validate_object = {} as YumValidate<YumObject>;
  });
});
