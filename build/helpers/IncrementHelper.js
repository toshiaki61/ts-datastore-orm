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
exports.IncrementHelper = void 0;
const TsDatastoreOrmError_1 = require("../errors/TsDatastoreOrmError");
const TransactionManager_1 = require("../transactions/TransactionManager");
const tsDatastoreOrm_1 = require("../tsDatastoreOrm");
class IncrementHelper {
    constructor(options) {
        this.datastore = options.datastore;
        this.classObject = options.classObject;
        this.namespace = options.namespace;
        this.kind = options.kind;
        this.maxRetry = options.maxRetry;
        this.retryDelay = options.retryDelay;
    }
    increment(id_1, fieldName_1) {
        return __awaiter(this, arguments, void 0, function* (id, fieldName, increment = 1) {
            const key = tsDatastoreOrm_1.tsDatastoreOrm.normalizeAndValidateKey(id, this.namespace, this.kind);
            const transactionManager = new TransactionManager_1.TransactionManager({
                datastore: this.datastore,
                maxRetry: this.maxRetry,
                retryDelay: this.retryDelay,
                readOnly: false,
            });
            const result = yield transactionManager.start((session) => __awaiter(this, void 0, void 0, function* () {
                const [data] = yield session.transaction.get(key);
                if (!data) {
                    throw new TsDatastoreOrmError_1.TsDatastoreOrmError("(IncrementHelper) Entity not exist.");
                }
                if (data[fieldName] !== undefined && typeof data[fieldName] !== "number") {
                    throw new TsDatastoreOrmError_1.TsDatastoreOrmError("(IncrementHelper) Current Entity field is not a number.");
                }
                // update back to the entity
                const oldValue = data[fieldName] || 0;
                const newValue = oldValue + 1;
                data[fieldName] = newValue;
                const updateData = {
                    key,
                    data,
                };
                // update
                session.transaction.update(updateData);
                return newValue;
            }));
            return result.value;
        });
    }
}
exports.IncrementHelper = IncrementHelper;
