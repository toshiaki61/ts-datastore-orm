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
exports.SelectKeyQueryAsyncIterator = void 0;
const entity_1 = require("@google-cloud/datastore/build/src/entity");
const tsDatastoreOrm_1 = require("../tsDatastoreOrm");
const utils_1 = require("../utils");
class SelectKeyQueryAsyncIterator {
    constructor(options) {
        this.isClosed = false;
        this.query = options.query;
    }
    close() {
        this.isClosed = true;
    }
    [Symbol.asyncIterator]() {
        return {
            next: () => __awaiter(this, void 0, void 0, function* () {
                const friendlyErrorStack = tsDatastoreOrm_1.tsDatastoreOrm.getFriendlyErrorStack();
                try {
                    // if we haven't manually paused it
                    if (!this.isClosed) {
                        // try to fetch results
                        const [results, queryInfo] = yield this.query.run();
                        // update end cursor for next round
                        if (queryInfo && queryInfo.endCursor) {
                            this.query.start(queryInfo.endCursor);
                        }
                        // if we have results
                        if (results.length) {
                            const keys = [];
                            for (const data of results) {
                                const key = data[entity_1.entity.KEY_SYMBOL];
                                keys.push(key);
                            }
                            return { value: keys, done: false };
                        }
                        else {
                            this.isClosed = true;
                        }
                    }
                    return { value: undefined, done: true };
                }
                catch (err) {
                    throw Object.assign(err, friendlyErrorStack && { stack: (0, utils_1.updateStack)(friendlyErrorStack, err) });
                }
            }),
        };
    }
}
exports.SelectKeyQueryAsyncIterator = SelectKeyQueryAsyncIterator;
