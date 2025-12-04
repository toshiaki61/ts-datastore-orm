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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const BaseEntity_1 = require("./BaseEntity");
const constants_1 = require("./constants");
const TsDatastoreOrmError_1 = require("./errors/TsDatastoreOrmError");
const IncrementHelper_1 = require("./helpers/IncrementHelper");
const IndexResaveHelper_1 = require("./helpers/IndexResaveHelper");
const Query_1 = require("./queries/Query");
const SelectKeyQuery_1 = require("./queries/SelectKeyQuery");
const tsDatastoreOrm_1 = require("./tsDatastoreOrm");
const utils_1 = require("./utils");
class Repository {
    constructor(options) {
        this.datastore = options.datastore;
        this.classObject = options.classObject;
        this.namespace = options.namespace;
        this.kind = options.kind;
    }
    create(values = {}) {
        const entity = new this.classObject();
        entity._kind = this.kind;
        entity._namespace = this.namespace;
        Object.assign(entity, values);
        return entity;
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = tsDatastoreOrm_1.tsDatastoreOrm.normalizeAndValidateKey(id, this.namespace, this.kind);
            const friendlyErrorStack = tsDatastoreOrm_1.tsDatastoreOrm.getFriendlyErrorStack();
            try {
                const [response] = yield this.datastore.get(key);
                if (response) {
                    return yield tsDatastoreOrm_1.tsDatastoreOrm.loadEntity(this.classObject, response);
                }
            }
            catch (err) {
                throw Object.assign(err, friendlyErrorStack && { stack: (0, utils_1.updateStack)(friendlyErrorStack, err) });
            }
        });
    }
    findOneWithSession(id, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = tsDatastoreOrm_1.tsDatastoreOrm.normalizeAndValidateKey(id, this.namespace, this.kind);
            return yield session.findOne(this.classObject, key);
        });
    }
    findMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = tsDatastoreOrm_1.tsDatastoreOrm.normalizeAndValidateKeys(ids, this.namespace, this.kind);
            const friendlyErrorStack = tsDatastoreOrm_1.tsDatastoreOrm.getFriendlyErrorStack();
            try {
                const entities = [];
                const [response] = yield this.datastore.get(keys);
                for (const data of response) {
                    const entity = yield tsDatastoreOrm_1.tsDatastoreOrm.loadEntity(this.classObject, data);
                    entities.push(entity);
                }
                return entities;
            }
            catch (err) {
                throw Object.assign(err, friendlyErrorStack && { stack: (0, utils_1.updateStack)(friendlyErrorStack, err) });
            }
        });
    }
    findManyWithSessions(ids, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = tsDatastoreOrm_1.tsDatastoreOrm.normalizeAndValidateKeys(ids, this.namespace, this.kind);
            return yield session.findMany(this.classObject, keys);
        });
    }
    query(options) {
        const query = this.datastore.createQuery();
        query.namespace = this.namespace;
        query.kinds = [this.kind];
        return new Query_1.Query({ datastore: this.datastore,
            classObject: this.classObject,
            namespace: this.namespace,
            kind: this.kind,
            query,
        });
    }
    queryWithSession(session, options) {
        const query = session.transaction.createQuery();
        query.namespace = this.namespace;
        query.kinds = [this.kind];
        return new Query_1.Query({ datastore: this.datastore,
            classObject: this.classObject,
            namespace: this.namespace,
            kind: this.kind,
            query,
        });
    }
    selectKeyQuery(options) {
        const query = this.datastore.createQuery();
        query.namespace = this.namespace;
        query.kinds = [this.kind];
        return new SelectKeyQuery_1.SelectKeyQuery({ datastore: this.datastore,
            namespace: this.namespace,
            kind: this.kind,
            query,
        });
    }
    selectKeyQueryWithSession(session, options) {
        const query = session.transaction.createQuery();
        query.namespace = this.namespace;
        query.kinds = [this.kind];
        return new SelectKeyQuery_1.SelectKeyQuery({ datastore: this.datastore,
            namespace: this.namespace,
            kind: this.kind,
            query,
        });
    }
    allocateIds(total) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendlyErrorStack = tsDatastoreOrm_1.tsDatastoreOrm.getFriendlyErrorStack();
            try {
                const key = this.datastore.key({ namespace: this.namespace, path: [this.kind] });
                const [ids] = yield this.datastore.allocateIds(key, total);
                return ids.map(x => Number(x.id));
            }
            catch (err) {
                throw Object.assign(err, friendlyErrorStack && { stack: (0, utils_1.updateStack)(friendlyErrorStack, err) });
            }
        });
    }
    allocateIdsWithSession(total, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.datastore.key({ namespace: this.namespace, path: [this.kind] });
            return yield session.allocateIds(key, total);
        });
    }
    insert(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._internalInsert(entities, false);
        });
    }
    insertWithSession(entities, session) {
        tsDatastoreOrm_1.tsDatastoreOrm.validateEntity(entities, this.namespace, this.kind, false);
        session.insert(entities);
    }
    upsert(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._internalInsert(entities, true);
        });
    }
    upsertWithSession(entities, session) {
        tsDatastoreOrm_1.tsDatastoreOrm.validateEntity(entities, this.namespace, this.kind, false);
        session.upsert(entities);
    }
    update(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            tsDatastoreOrm_1.tsDatastoreOrm.validateEntity(entities, this.namespace, this.kind);
            // validate then run hook
            tsDatastoreOrm_1.tsDatastoreOrm.runHookOfBeforeUpdate(entities);
            const updateDataList = [];
            for (const entity of Array.isArray(entities) ? entities : [entities]) {
                const { updateData } = tsDatastoreOrm_1.tsDatastoreOrm.getUpdateData(entity);
                updateDataList.push(updateData);
            }
            const friendlyErrorStack = tsDatastoreOrm_1.tsDatastoreOrm.getFriendlyErrorStack();
            try {
                const [updateResult] = yield this.datastore.update(updateDataList);
            }
            catch (err) {
                throw Object.assign(err, friendlyErrorStack && { stack: (0, utils_1.updateStack)(friendlyErrorStack, err) });
            }
            return entities;
        });
    }
    updateWithSession(entities, session) {
        tsDatastoreOrm_1.tsDatastoreOrm.validateEntity(entities, this.namespace, this.kind);
        session.update(entities);
    }
    // Remarks: merge is not support to avoid confusion
    // public async merge<P extends InstanceType<T> | Array<InstanceType<T>>>(entities: P): Promise<P> {
    //     tsDatastoreOrm.validateEntity(entities, this.namespace, this.kind);
    //
    //     const updateDataList: any[] = [];
    //     for (const entity of Array.isArray(entities) ? entities : [entities]) {
    //         const {updateData} = tsDatastoreOrm.getUpdateData(entity);
    //         updateDataList.push(updateData);
    //     }
    //
    //     const friendlyErrorStack = tsDatastoreOrm.getFriendlyErrorStack();
    //     try {
    //         const [updateResult] = await this.datastore.merge(updateDataList);
    //         return entities;
    //     } catch (err) {
    //         throw Object.assign(err, friendlyErrorStack && {stack: updateStack(friendlyErrorStack, err)});
    //     }
    // }
    delete(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = [];
            const newEntities = Array.isArray(entities) ? entities : [entities];
            for (const entity of newEntities) {
                const key = tsDatastoreOrm_1.tsDatastoreOrm.normalizeAndValidateKey(entity, this.namespace, this.kind);
                keys.push(key);
            }
            // validate then run hook
            for (const entity of newEntities) {
                if (entity instanceof BaseEntity_1.BaseEntity) {
                    tsDatastoreOrm_1.tsDatastoreOrm.runHookOfBeforeDelete(entity);
                }
            }
            const friendlyErrorStack = tsDatastoreOrm_1.tsDatastoreOrm.getFriendlyErrorStack();
            try {
                const [deleteResult] = yield this.datastore.delete(keys);
                return entities;
            }
            catch (err) {
                throw Object.assign(err, friendlyErrorStack && { stack: (0, utils_1.updateStack)(friendlyErrorStack, err) });
            }
        });
    }
    deleteWithSession(entities, session) {
        // validate the entities first
        const newEntities = Array.isArray(entities) ? entities : [entities];
        for (const entity of newEntities) {
            tsDatastoreOrm_1.tsDatastoreOrm.normalizeAndValidateKey(entity, this.namespace, this.kind);
        }
        session.delete(entities);
    }
    truncate() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const iterator = this.selectKeyQuery()
                .limit(constants_1.MAX_ENTITIES)
                .getAsyncIterator();
            let total = 0;
            try {
                for (var _d = true, iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = yield iterator_1.next(), _a = iterator_1_1.done, !_a; _d = true) {
                    _c = iterator_1_1.value;
                    _d = false;
                    const keys = _c;
                    yield this.delete(keys);
                    total += keys.length;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = iterator_1.return)) yield _b.call(iterator_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return total;
        });
    }
    getUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const namespace = this.namespace ? this.namespace : "__$DEFAULT$__/query/kind";
            const projectId = yield this.datastore.auth.getProjectId();
            return `https://console.cloud.google.com/datastore/entities;kind=${this.kind};ns=${namespace}/query/kind?project=${projectId}`;
        });
    }
    // region helper
    getIndexResaveHelper() {
        return new IndexResaveHelper_1.IndexResaveHelper({
            classObject: this.classObject,
            namespace: this.namespace,
            kind: this.kind,
            datastore: this.datastore,
        });
    }
    getIncrementHelper(options = {}) {
        return new IncrementHelper_1.IncrementHelper({
            classObject: this.classObject,
            namespace: this.namespace,
            kind: this.kind,
            datastore: this.datastore,
            maxRetry: options.maxRetry || 0,
            retryDelay: options.retryDelay || 0,
        });
    }
    // endregion
    // region private methods
    _internalInsert(entities, isUpsert) {
        return __awaiter(this, void 0, void 0, function* () {
            tsDatastoreOrm_1.tsDatastoreOrm.validateEntity(entities, this.namespace, this.kind, false);
            const insertDataList = [];
            const generateEntities = new Map();
            if (isUpsert) {
                tsDatastoreOrm_1.tsDatastoreOrm.runHookOfBeforeUpsert(entities);
            }
            else {
                tsDatastoreOrm_1.tsDatastoreOrm.runHookOfBeforeInsert(entities);
            }
            for (const entity of Array.isArray(entities) ? entities : [entities]) {
                const { isGenerateId, insertData } = tsDatastoreOrm_1.tsDatastoreOrm.getInsertData(entity);
                // save the auto generate entities
                if (isGenerateId) {
                    if (generateEntities.has(entity)) {
                        throw new TsDatastoreOrmError_1.TsDatastoreOrmError(`You cannot insert the same entity.`);
                    }
                    generateEntities.set(entity, insertData.key);
                }
                insertDataList.push(insertData);
            }
            const friendlyErrorStack = tsDatastoreOrm_1.tsDatastoreOrm.getFriendlyErrorStack();
            try {
                if (isUpsert) {
                    const [response] = yield this.datastore.upsert(insertDataList);
                }
                else {
                    const [response] = yield this.datastore.insert(insertDataList);
                }
                // update back the auto generate id
                for (const [entity, key] of generateEntities.entries()) {
                    entity._id = Number(key.id);
                }
                return entities;
            }
            catch (err) {
                throw Object.assign(err, friendlyErrorStack && { stack: (0, utils_1.updateStack)(friendlyErrorStack, err) });
            }
        });
    }
}
exports.Repository = Repository;
