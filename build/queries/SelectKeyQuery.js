"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectKeyQuery = void 0;
const constants_1 = require("../constants");
const BaseQuery_1 = require("./BaseQuery");
const entity_1 = require("@google-cloud/datastore/build/src/entity");
const SelectKeyQueryAsyncIterator_1 = require("./SelectKeyQueryAsyncIterator");
class SelectKeyQuery extends BaseQuery_1.BaseQuery {
    constructor(options) {
        super({ datastore: options.datastore, namespace: options.namespace, kind: options.kind, query: options.query });
        this.query.select("__key__");
    }
    getAsyncIterator() {
        if (this.query.limitVal === -1) {
            this.query.limit(constants_1.MAX_ENTITIES);
        }
        return new SelectKeyQueryAsyncIterator_1.SelectKeyQueryAsyncIterator({ query: this.query });
    }
    findOne() {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _super.findOne.call(this);
            if (data) {
                return data[entity_1.entity.KEY_SYMBOL];
            }
        });
    }
    findMany() {
        const _super = Object.create(null, {
            findMany: { get: () => super.findMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield _super.findMany.call(this);
            const keys = [];
            for (const data of results) {
                const key = data[entity_1.entity.KEY_SYMBOL];
                keys.push(key);
            }
            return keys;
        });
    }
}
exports.SelectKeyQuery = SelectKeyQuery;
