import { IsUUIDVersion } from '@drpiou/ts-utils';
export type YumOptions = {
    cast?: boolean;
    first?: boolean;
    path?: string;
    strict?: boolean;
};
export type YumOptionsWithMessages = YumOptions & {
    messages?: YumMessages;
};
export type YumErrorReason<Rule extends YumMessageRule = YumMessageRule> = {
    label?: string;
    message: string;
    path?: string;
    type: YumTypeBase['type'];
    rule: Rule;
    condition?: YumMessageConditions[Rule];
};
export type YumMessage<Rule extends YumMessageRule> = string | ((reason: YumErrorReason<Rule>) => string);
export type YumMessageRule = keyof YumMessageConditions;
export type YumMessageConditions = {
    type?: undefined;
    format?: YumFormatRule;
    include?: YumIncludeRule<YumIncludeAccept>[];
    nullable?: YumNullableRule;
    range?: YumRangeValue[];
    regex?: YumRegexRule;
    required?: YumRequiredRule;
};
export type YumMessages = {
    [Key in keyof YumMessageConditions]: YumMessage<Key>;
};
export type YumType<Output = unknown, Optional extends YumOptional = never, Default = Output | Optional> = {
    type: 'mixed' | 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
    default: Default;
};
export type YumTypeBase = YumType<unknown, YumOptional>;
export type YumMixed<Output = unknown, Optional extends YumOptional = never> = YumType<Output, Optional> & {
    type: 'mixed';
    _validateMixed: YumValidateCallback<unknown, Output>;
};
export type YumMixedBase = YumMixed<unknown, YumOptional>;
export type YumString<Output = string, Optional extends YumOptional = never> = YumType<Output, Optional> & {
    type: 'string';
    _validateString: YumValidateCallback<unknown, Output>;
};
export type YumStringOptions = YumOptions & {
    messages?: YumMessages;
};
export type YumStringBase = YumString<string, YumOptional>;
export type YumNumberOptions = YumOptions & {
    messages?: Omit<YumMessages, 'format' | 'regex'>;
};
export type YumNumber<Output = number, Optional extends YumOptional = never> = YumType<Output, Optional> & {
    type: 'number';
    _validateNumber: YumValidateCallback<unknown, Output>;
};
export type YumNumberBase = YumNumber<number, YumOptional>;
export type YumBooleanOptions = YumOptions & {
    messages?: Omit<YumMessages, 'format' | 'include' | 'range' | 'regex'>;
};
export type YumBoolean<Output = boolean, Optional extends YumOptional = never> = YumType<Output, Optional> & {
    type: 'boolean';
    _validateBoolean: YumValidateCallback<unknown, Output>;
};
export type YumBooleanBase = YumBoolean<boolean, YumOptional>;
export type YumDateOptions = YumOptions & {
    messages?: Omit<YumMessages, 'format' | 'regex'>;
};
export type YumDate<Output = Date, Optional extends YumOptional = never> = YumType<Output, Optional> & {
    type: 'date';
    _validateDate: YumValidateCallback<unknown, Output>;
};
export type YumDateBase = YumDate<Date, YumOptional>;
export type YumArrayOptions = YumOptions & {
    messages?: Omit<YumMessages, 'format' | 'regex'>;
};
export type YumArray<Output = unknown, Optional extends YumOptional = never> = YumType<Output, Optional, Output[] | Optional> & {
    type: 'array';
    _validateArray: YumValidateCallback<unknown, Output[]>;
};
export type YumArrayBase = YumArray<unknown, YumOptional>;
export type YumObjectOptions = YumOptions & {
    messages?: Omit<YumMessages, 'format' | 'include' | 'range' | 'regex'>;
};
export type YumObjectShape = Record<string, unknown>;
export type YumObject<Output = YumObjectShape, Optional extends YumOptional = never> = YumType<Output, Optional> & {
    type: 'object';
    _validateObject: YumValidateCallback<unknown, Output>;
};
export type YumObjectBase = YumObject<YumObjectShape, YumOptional>;
export type YumLabelType = {
    label: string;
};
export type YumLabelAccept = YumTypeBase;
export type YumLabel<Yum extends YumLabelAccept> = Omit<Yum, keyof YumLabelType> & YumLabelType;
export type YumLabelBase = YumLabel<YumLabelAccept>;
export type YumCustomType = {
    custom: string;
};
export type YumCustomAccept = YumTypeBase;
export type YumCustom<Yum extends YumCustomAccept> = Omit<Yum, keyof YumCustomType> & YumCustomType;
export type YumCustomBase = YumCustom<YumCustomAccept>;
export type YumTransformCallback<Yum extends YumTransformAccept> = (value: any) => YumDefault<Yum>;
export type YumTransformType<Yum extends YumTransformAccept> = {
    transform: YumTransformCallback<Yum>;
};
export type YumTransformAccept = YumTypeBase;
export type YumTransform<Yum extends YumTransformAccept> = Omit<Yum, keyof YumTransformType<Yum>> & YumTransformType<Yum>;
export type YumTransformBase = YumTransform<YumTransformAccept>;
export type YumNullableOptions = {
    message?: YumMessages['nullable'];
};
export type YumNullableRule = boolean;
export type YumNullableType<Rule extends YumNullableRule> = {
    nullable: Rule;
    _validateNullable: YumValidateCallback;
};
export type YumNullableAccept = YumTypeBase;
export type YumNullable<Rule extends YumNullableRule, Yum extends YumNullableAccept> = {
    [Key in keyof Omit<Yum, keyof YumNullableType<Rule>>]: Key extends 'default' ? Rule extends true ? Yum[Key] | null : Exclude<Yum[Key], null> : Yum[Key];
} & YumNullableType<Rule>;
export type YumNullableBase = YumNullable<YumNullableRule, YumNullableAccept>;
export type YumRequiredOptions = {
    message?: YumMessages['required'];
};
export type YumRequiredRule = boolean;
export type YumRequiredType<Rule extends YumRequiredRule> = {
    required: Rule;
    _validateRequired: YumValidateCallback;
};
export type YumRequiredAccept = YumTypeBase;
export type YumRequired<Rule extends YumRequiredRule, Yum extends YumRequiredAccept> = {
    [Key in keyof Omit<Yum, keyof YumRequiredType<Rule>>]: Key extends 'default' ? Rule extends true ? Exclude<Yum[Key], undefined> : Yum[Key] | undefined : Yum[Key];
} & YumRequiredType<Rule>;
export type YumRequiredBase = YumRequired<YumRequiredRule, YumRequiredAccept>;
export type YumRangeOptions = {
    message?: YumMessages['range'];
};
export type YumRangeValue = [min: number | null, max?: number | null];
export type YumRangeRule = YumRangeValue | YumRangeValue[];
export type YumRangeType<Rule extends YumRangeRule> = {
    range: Rule;
    _validateRange: YumValidateCallback<number>;
};
export type YumRangeAccept = YumStringBase | YumNumberBase | YumDateBase | YumArrayBase;
export type YumRange<Rule extends YumRangeRule, Yum extends YumRangeAccept> = Omit<Yum, keyof YumRangeType<Rule>> & YumRangeType<Rule>;
export type YumRangeBase = YumRange<YumRangeRule, YumRangeAccept>;
export type YumRegexOptions = {
    message?: YumMessages['regex'];
};
export type YumRegexRule = RegExp;
export type YumRegexType<Rule extends YumRegexRule> = {
    regex: Rule;
    _validateRegex: YumValidateCallback<string>;
};
export type YumRegexAccept = YumStringBase;
export type YumRegex<Rule extends YumRegexRule, Yum extends YumRegexAccept> = Omit<Yum, keyof YumRegexType<Rule>> & YumRegexType<Rule>;
export type YumRegexBase = YumRegex<YumRegexRule, YumRegexAccept>;
export type YumFormatOptions<Rule extends YumFormatRule> = (Rule extends 'url' ? {
    protocol?: string | string[];
} : Rule extends 'uuid' ? {
    version?: IsUUIDVersion;
} : NonNullable<unknown>) & {
    message?: YumMessages['format'];
};
export type YumFormatRule = 'date' | 'email' | 'ipv4' | 'ipv6' | 'phone' | 'url' | 'uuid';
export type YumFormatType<Rule extends YumFormatRule> = {
    format: Rule;
    _validateFormat: YumValidateCallback<string>;
};
export type YumFormatAccept = YumStringBase;
export type YumFormat<Rule extends YumFormatRule, Yum extends YumFormatAccept> = Omit<Yum, keyof YumFormatType<Rule>> & YumFormatType<Rule>;
export type YumFormatBase = YumFormat<YumFormatRule, YumFormatAccept>;
export type YumOrRule = YumTypeBase[];
export type YumOrType<Rule extends YumOrRule> = {
    or: Rule;
    _validateOr: YumValidateCallback<unknown, YumDefault<Rule[number]>>;
};
export type YumOrAccept = YumMixedBase;
export type YumOr<Rule extends YumOrRule, Yum extends YumOrAccept> = {
    [Key in keyof Omit<Yum, keyof YumOrType<Rule>>]: Key extends 'default' ? YumDefault<Rule[number]> | YumExtractOptional<Yum[Key]> : Yum[Key];
} & YumOrType<Rule>;
export type YumOrBase = YumOr<YumOrRule, YumOrAccept>;
export type YumOfRule = YumTypeBase;
export type YumOfType<Rule extends YumOfRule> = {
    of: Rule;
    _validateOf: YumValidateCallback<unknown[], YumDefault<Rule>[]>;
};
export type YumOfAccept = YumArrayBase;
export type YumOf<Rule extends YumOfRule, Yum extends YumOfAccept> = {
    [Key in keyof Omit<Yum, keyof YumOfType<Rule>>]: Key extends 'default' ? YumDefault<Rule>[] | YumExtractOptional<Yum[Key]> : Yum[Key];
} & YumOfType<Rule>;
export type YumOfBase = YumOf<YumOfRule, YumOfAccept>;
export type YumShapeRule = Record<string, YumTypeBase>;
export type YumShapeType<Rule extends YumShapeRule> = {
    shape: Rule;
    _validateShape: YumValidateCallback<Record<string, unknown>, YumShapeOutput<Rule>>;
};
export type YumShapeAccept = YumObjectBase;
export type YumShape<Rule extends YumShapeRule, Yum extends YumShapeAccept> = {
    [Key in keyof Omit<Yum, keyof YumShapeType<Rule>>]: Key extends 'default' ? YumShapeOutput<Rule> | YumExtractOptional<Yum[Key]> : Yum[Key];
} & YumShapeType<Rule>;
export type YumShapeOutput<Rule extends YumShapeRule> = {
    [Key in keyof Rule]: Rule[Key] extends YumShapeBase ? YumShapeOutput<Rule[Key]['shape']> : YumDefault<Rule[Key]>;
};
export type YumShapeBase = YumShape<YumShapeRule, YumShapeAccept>;
export type YumIncludeOptions<Yum extends YumIncludeAccept> = {
    message?: YumMessages['include'];
};
export type YumIncludeRule<Yum extends YumIncludeAccept> = YumDefault<Yum>;
export type YumIncludeType<Rule extends YumIncludeRule<YumIncludeAccept>> = {
    include: Rule[];
    _validateInclude: YumValidateCallback;
};
export type YumIncludeAccept = YumStringBase | YumNumberBase | YumDateBase | YumArrayBase;
export type YumInclude<Rule extends YumIncludeRule<Yum>, Yum extends YumIncludeAccept> = {
    [Key in keyof Omit<Yum, keyof YumIncludeType<Rule>>]: Key extends 'default' ? Rule | YumExtractOptional<Yum[Key]> : Yum[Key];
} & YumIncludeType<Rule>;
export type YumIncludeBase = YumInclude<YumIncludeRule<YumIncludeAccept>, YumIncludeAccept>;
export type YumMerge<Extends extends YumExtendsTypeBase<Yum>, Yum extends YumTypeBase> = Omit<Yum, keyof Extends> & {
    [Key in keyof Extends]: Key extends 'default' ? (Extends extends YumIncludeBase ? YumExtractOutput<Extends[Key]> : YumExtractOutput<Yum[Key]>) | (Extends extends YumNullableBase ? YumExtractNullable<Extends[Key]> : YumExtractNullable<Yum[Key]>) | (Extends extends YumRequiredBase ? YumExtractRequired<Extends[Key]> : YumExtractRequired<Yum[Key]>) : Extends[Key];
};
export type YumValidateOptions = YumOptionsWithMessages & {};
export type YumValidateCallback<Value = unknown, Return = void> = (context: YumTypeBase, value: Value, options?: YumValidateOptions) => Return;
export type YumValidate<Yum extends YumTypeBase> = YumDefault<Yum>;
export type YumDefault<Yum extends YumTypeBase> = Yum['default'];
export type YumOptional = undefined | null;
export type YumExtractOutput<Default extends YumDefault<YumTypeBase>> = Exclude<Default, YumOptional>;
export type YumExtractOptional<Default extends YumDefault<YumTypeBase>> = Extract<Default, YumOptional>;
export type YumExtractNullable<Default extends YumDefault<YumTypeBase>> = Extract<Default, null>;
export type YumExtractRequired<Default extends YumDefault<YumTypeBase>> = Extract<Default, undefined>;
export type YumExtendsTypeBase<Yum extends YumTypeBase> = Yum extends YumMixedBase ? YumMixedBase : Yum extends YumStringBase ? YumStringBase : Yum extends YumNumberBase ? YumNumberBase : Yum extends YumBooleanBase ? YumBooleanBase : Yum extends YumDateBase ? YumDateBase : Yum extends YumArrayBase ? YumArrayBase : Yum extends YumObjectBase ? YumObjectBase : YumTypeBase;
