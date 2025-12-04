import * as Datastore from "@google-cloud/datastore";
import { BaseEntity } from "../BaseEntity";
import { IKey } from "../types";
interface IAsyncIterator<T> {
    next(value?: any): Promise<IteratorResult<T[]>>;
}
export declare class SelectKeyQueryAsyncIterator<T extends typeof BaseEntity> {
    readonly query: Datastore.Query;
    isClosed: boolean;
    constructor(options: {
        query: Datastore.Query;
    });
    close(): void;
    [Symbol.asyncIterator](): IAsyncIterator<IKey>;
}
export {};
