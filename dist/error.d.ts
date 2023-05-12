import { YumErrorReason } from './types';
export default class YumError extends TypeError {
    readonly reasons: YumErrorReason[];
    constructor(message?: string, reasons?: YumErrorReason | YumErrorReason[]);
    addReasons(reasons: YumErrorReason[]): void;
}
