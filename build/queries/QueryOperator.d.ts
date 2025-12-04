import * as Datastore from "@google-cloud/datastore";
import { Query } from "@google-cloud/datastore/build/src";
import { IKey } from "../types";
export declare class QueryOperator<V extends any> {
    private fieldName;
    private query;
    private datastore;
    private namespace;
    private kind;
    private ancestorKey?;
    constructor(options: {
        fieldName: string;
        query: Query;
        datastore: Datastore.Datastore;
        namespace: string | undefined;
        kind: string;
        ancestorKey?: IKey;
    });
    eq(value: V): void;
    le(value: V): this;
    lt(value: V): this;
    ge(value: V): this;
    gt(value: V): this;
    private _operation;
}
