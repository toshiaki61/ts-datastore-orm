"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Speed = void 0;
const cluster_1 = __importDefault(require("cluster"));
const index_1 = require("../index");
const utils_1 = require("../utils");
// entity
let Speed = class Speed extends index_1.BaseEntity {
    constructor() {
        super(...arguments);
        this._id = 0;
        this.date = new Date();
        this.number1 = 0;
        this.number2 = 0;
        this.string1 = "";
    }
};
exports.Speed = Speed;
__decorate([
    (0, index_1.Field)({ generateId: true }),
    __metadata("design:type", Number)
], Speed.prototype, "_id", void 0);
__decorate([
    (0, index_1.Field)({ index: true }),
    __metadata("design:type", Date)
], Speed.prototype, "date", void 0);
__decorate([
    (0, index_1.Field)({ index: true }),
    __metadata("design:type", Number)
], Speed.prototype, "number1", void 0);
__decorate([
    (0, index_1.Field)({ index: true }),
    __metadata("design:type", Number)
], Speed.prototype, "number2", void 0);
__decorate([
    (0, index_1.Field)({ index: true }),
    __metadata("design:type", String)
], Speed.prototype, "string1", void 0);
exports.Speed = Speed = __decorate([
    (0, index_1.Entity)({ kind: "speed2", namespace: "testing" })
], Speed);
// settings
const workerId = process.env.workerId || 0;
const reportDuration = 5 * 1000;
const createBatch = 100;
let total = 0;
let date = new Date();
function startCluster() {
    return __awaiter(this, void 0, void 0, function* () {
        const totalWorker = 1;
        console.log(`Total worker: ${totalWorker}`);
        for (let i = 0; i < totalWorker; i++) {
            cluster_1.default.fork({ workerId: i });
        }
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(reportWorker, reportDuration);
        const connection = yield (0, index_1.createConnection)({
            keyFilename: "./datastoreServiceAccount.json",
        });
        const repository = connection.getRepository(Speed);
        let count = 0;
        while (true) {
            const entities = Array(createBatch).fill(0).map((x, j) => {
                const entity = new Speed();
                entity.number1 = count++;
                entity.number2 = count * 10;
                entity.string1 = (100000 + count).toString();
                entity.date.setTime(entity.date.getTime() + j);
                return entity;
            });
            yield repository.insert(entities);
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
