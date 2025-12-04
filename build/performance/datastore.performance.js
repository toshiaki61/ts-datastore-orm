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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Datastore = __importStar(require("@google-cloud/datastore"));
const cluster_1 = __importDefault(require("cluster"));
const utils_1 = require("../utils");
// datastore
const dataStore = new Datastore.Datastore({ keyFilename: "./datastoreServiceAccount.json" });
// settings
const kind = "speed1";
const workerId = process.env.workerId || 0;
const reportDuration = 5 * 1000;
const createBatch = 100;
let total = 0;
let date = new Date();
function startCluster() {
    return __awaiter(this, void 0, void 0, function* () {
        const totalWorker = 30;
        console.log(`Total worker: ${totalWorker}`);
        for (let i = 0; i < totalWorker; i++) {
            cluster_1.default.fork({ workerId: i });
        }
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(reportWorker, reportDuration);
        while (true) {
            const entities = Array(createBatch).fill(0).map((x, j) => {
                const key = dataStore.key({ namespace: "testing", path: [kind] });
                return { key, data: {} };
            });
            yield dataStore.save(entities);
            total += createBatch;
        }
    });
}
function reportWorker() {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    console.log(`WorkerId: ${workerId}, Total created entity: ${total} in: ${diff / 1000}s, now: ${now}, memory: ${(0, utils_1.getUsedMemoryInMb)()}MB`);
    date = now;
    total = 0;
    setTimeout(reportWorker, reportDuration);
}
// cluster
if (cluster_1.default.isMaster) {
    startCluster();
}
else {
    startWorker();
}
