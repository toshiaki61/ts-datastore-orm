import { IKey } from "./types";
export declare class BaseEntity {
    _id: any;
    _namespace: string | undefined;
    _kind: string;
    _ancestorKey?: IKey;
    constructor();
    getKey(): IKey;
}
