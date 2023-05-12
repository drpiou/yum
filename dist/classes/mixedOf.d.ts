import { YumTypeBase } from '../types';
import { YumMixedClass } from './mixed';
export default function mixedOf<Of extends {
    getSchema(): YumTypeBase;
}[]>(of: Of): YumMixedClass<import("../types").YumMixed<import("../types").YumDefault<ReturnType<Of[number]["getSchema"]>>>>;
