import { BaseEntity } from "../BaseEntity";
import { IQueryParams } from "../types";
import { BaseQuery } from "./BaseQuery";
import { QueryAsyncIterator } from "./QueryAsyncIterator";
export declare class Query<T extends typeof BaseEntity, KT extends BaseEntity> extends BaseQuery<KT> {
    readonly classObject: T;
    constructor(options: IQueryParams<T>);
    getAsyncIterator(): QueryAsyncIterator<T>;
    findOne(): Promise<InstanceType<T> | undefined>;
    findMany(): Promise<InstanceType<T>[]>;
}
