"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.errorCodes = exports.namespaceStats = exports.stats = exports.TsDatastoreOrmError = exports.IndexResaveHelper = exports.IncrementHelper = exports.SelectKeyQueryAsyncIterator = exports.QueryAsyncIterator = exports.SelectKeyQuery = exports.Query = exports.DatastoreAdmin = exports.CompositeIndexExporter = exports.Session = exports.TransactionManager = exports.LockManager = exports.Connection = exports.Repository = exports.BaseEntity = exports.BeforeDelete = exports.BeforeUpdate = exports.BeforeUpsert = exports.BeforeInsert = exports.AfterLoad = exports.Entity = exports.Field = exports.CompositeIndex = exports.tsDatastoreOrm = exports.createConnection = void 0;
const BaseEntity_1 = require("./BaseEntity");
Object.defineProperty(exports, "BaseEntity", { enumerable: true, get: function () { return BaseEntity_1.BaseEntity; } });
const CompositeIndexExporter_1 = require("./CompositeIndexExporter");
Object.defineProperty(exports, "CompositeIndexExporter", { enumerable: true, get: function () { return CompositeIndexExporter_1.CompositeIndexExporter; } });
const Connection_1 = require("./Connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return Connection_1.Connection; } });
const createConnection_1 = require("./createConnection");
Object.defineProperty(exports, "createConnection", { enumerable: true, get: function () { return createConnection_1.createConnection; } });
const DatastoreAdmin_1 = require("./DatastoreAdmin");
Object.defineProperty(exports, "DatastoreAdmin", { enumerable: true, get: function () { return DatastoreAdmin_1.DatastoreAdmin; } });
const CompositeIndex_1 = require("./decorators/CompositeIndex");
Object.defineProperty(exports, "CompositeIndex", { enumerable: true, get: function () { return CompositeIndex_1.CompositeIndex; } });
const Entity_1 = require("./decorators/Entity");
Object.defineProperty(exports, "Entity", { enumerable: true, get: function () { return Entity_1.Entity; } });
const Field_1 = require("./decorators/Field");
Object.defineProperty(exports, "Field", { enumerable: true, get: function () { return Field_1.Field; } });
const AfterLoad_1 = require("./decorators/hooks/AfterLoad");
Object.defineProperty(exports, "AfterLoad", { enumerable: true, get: function () { return AfterLoad_1.AfterLoad; } });
const BeforeDelete_1 = require("./decorators/hooks/BeforeDelete");
Object.defineProperty(exports, "BeforeDelete", { enumerable: true, get: function () { return BeforeDelete_1.BeforeDelete; } });
const BeforeInsert_1 = require("./decorators/hooks/BeforeInsert");
Object.defineProperty(exports, "BeforeInsert", { enumerable: true, get: function () { return BeforeInsert_1.BeforeInsert; } });
const BeforeUpdate_1 = require("./decorators/hooks/BeforeUpdate");
Object.defineProperty(exports, "BeforeUpdate", { enumerable: true, get: function () { return BeforeUpdate_1.BeforeUpdate; } });
const BeforeUpsert_1 = require("./decorators/hooks/BeforeUpsert");
Object.defineProperty(exports, "BeforeUpsert", { enumerable: true, get: function () { return BeforeUpsert_1.BeforeUpsert; } });
const errorCodes_1 = require("./enums/errorCodes");
Object.defineProperty(exports, "errorCodes", { enumerable: true, get: function () { return errorCodes_1.errorCodes; } });
const namespaceStats_1 = require("./enums/namespaceStats");
Object.defineProperty(exports, "namespaceStats", { enumerable: true, get: function () { return namespaceStats_1.namespaceStats; } });
const stats_1 = require("./enums/stats");
Object.defineProperty(exports, "stats", { enumerable: true, get: function () { return stats_1.stats; } });
const TsDatastoreOrmError_1 = require("./errors/TsDatastoreOrmError");
Object.defineProperty(exports, "TsDatastoreOrmError", { enumerable: true, get: function () { return TsDatastoreOrmError_1.TsDatastoreOrmError; } });
const IncrementHelper_1 = require("./helpers/IncrementHelper");
Object.defineProperty(exports, "IncrementHelper", { enumerable: true, get: function () { return IncrementHelper_1.IncrementHelper; } });
const IndexResaveHelper_1 = require("./helpers/IndexResaveHelper");
Object.defineProperty(exports, "IndexResaveHelper", { enumerable: true, get: function () { return IndexResaveHelper_1.IndexResaveHelper; } });
const LockManager_1 = require("./locks/LockManager");
Object.defineProperty(exports, "LockManager", { enumerable: true, get: function () { return LockManager_1.LockManager; } });
const Query_1 = require("./queries/Query");
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return Query_1.Query; } });
const QueryAsyncIterator_1 = require("./queries/QueryAsyncIterator");
Object.defineProperty(exports, "QueryAsyncIterator", { enumerable: true, get: function () { return QueryAsyncIterator_1.QueryAsyncIterator; } });
const SelectKeyQuery_1 = require("./queries/SelectKeyQuery");
Object.defineProperty(exports, "SelectKeyQuery", { enumerable: true, get: function () { return SelectKeyQuery_1.SelectKeyQuery; } });
const SelectKeyQueryAsyncIterator_1 = require("./queries/SelectKeyQueryAsyncIterator");
Object.defineProperty(exports, "SelectKeyQueryAsyncIterator", { enumerable: true, get: function () { return SelectKeyQueryAsyncIterator_1.SelectKeyQueryAsyncIterator; } });
const Repository_1 = require("./Repository");
Object.defineProperty(exports, "Repository", { enumerable: true, get: function () { return Repository_1.Repository; } });
const Session_1 = require("./transactions/Session");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return Session_1.Session; } });
const TransactionManager_1 = require("./transactions/TransactionManager");
Object.defineProperty(exports, "TransactionManager", { enumerable: true, get: function () { return TransactionManager_1.TransactionManager; } });
const tsDatastoreOrm_1 = require("./tsDatastoreOrm");
Object.defineProperty(exports, "tsDatastoreOrm", { enumerable: true, get: function () { return tsDatastoreOrm_1.tsDatastoreOrm; } });
const types = __importStar(require("./types"));
exports.types = types;
__exportStar(require("./utils/datastore"), exports);
