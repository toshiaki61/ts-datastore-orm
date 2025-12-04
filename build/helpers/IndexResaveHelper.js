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
exports.IndexResaveHelper = void 0;
const constants_1 = require("../constants");
const decoratorMeta_1 = require("../decoratorMeta");
const TsDatastoreOrmError_1 = require("../errors/TsDatastoreOrmError");
const Query_1 = require("../queries/Query");
const tsDatastoreOrm_1 = require("../tsDatastoreOrm");
const utils_1 = require("../utils");
class IndexResaveHelper {
    constructor(options) {
        this.datastore = options.datastore;
        this.classObject = options.classObject;
        this.namespace = options.namespace;
        this.kind = options.kind;
    }
    resave(fieldNames) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const entityFieldMetaList = decoratorMeta_1.decoratorMeta.getEntityFieldMetaList(this.classObject);
            fieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
            for (const fieldName of fieldNames) {
                const entityFieldMea = entityFieldMetaList.get(fieldName);
                if (!entityFieldMea || !entityFieldMea.index) {
                    throw new TsDatastoreOrmError_1.TsDatastoreOrmError(`(IndexResaveHelper) Field "${fieldName.toString()}" is not set as index.`);
                }
            }
            const batch = 500;
            const datastoreQuery = this.datastore.createQuery();
            datastoreQuery.namespace = this.namespace;
            datastoreQuery.kinds = [this.kind];
            const query = new Query_1.Query({
                datastore: this.datastore,
                classObject: this.classObject,
                namespace: this.namespace,
                kind: this.kind,
                query: datastoreQuery,
            });
            query.limit(constants_1.MAX_ENTITIES);
            // we do batch delete to optimize performance
            let totalUpdated = 0;
            try {
                for (var _d = true, _e = __asyncValues(query.getAsyncIterator()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const entities = _c;
                    const updateDataList = [];
                    // query
                    totalUpdated += entities.length;
                    // prepare update data
                    for (const entity of entities) {
                        const data = fieldNames.reduce((a, b) => Object.assign(a, { [b]: entity[b] }), {});
                        updateDataList.push({
                            key: entity.getKey(),
                            data,
                        });
                    }
                    // update the only selected columns
                    const friendlyErrorStack = tsDatastoreOrm_1.tsDatastoreOrm.getFriendlyErrorStack();
                    try {
                        const [mergeResult] = yield this.datastore.merge(updateDataList);
                    }
                    catch (err) {
                        throw Object.assign(err, friendlyErrorStack && { stack: (0, utils_1.updateStack)(friendlyErrorStack, err) });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return totalUpdated;
        });
    }
}
exports.IndexResaveHelper = IndexResaveHelper;
