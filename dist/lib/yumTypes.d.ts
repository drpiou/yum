import array, { isArray } from './types/array';
import boolean, { isBoolean } from './types/boolean';
import date, { isDate } from './types/date';
import mixed, { isMixed } from './types/mixed';
import mixedOf from './types/mixedOf';
import number, { isNumber } from './types/number';
import object, { isObject } from './types/object';
import string, { isString } from './types/string';
export declare const yumTypes: {
    array: typeof array;
    boolean: typeof boolean;
    date: typeof date;
    isArray: typeof isArray;
    isBoolean: typeof isBoolean;
    isDate: typeof isDate;
    isMixed: typeof isMixed;
    isNumber: typeof isNumber;
    isObject: typeof isObject;
    isString: typeof isString;
    mixed: typeof mixed;
    mixedOf: typeof mixedOf;
    number: typeof number;
    object: typeof object;
    string: typeof string;
};