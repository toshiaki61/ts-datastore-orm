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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMd5 = createMd5;
exports.timeout = timeout;
exports.generateRandomString = generateRandomString;
exports.getUsedMemoryInMb = getUsedMemoryInMb;
exports.readJsonFile = readJsonFile;
exports.replaceFirstLine = replaceFirstLine;
exports.updateStack = updateStack;
const crypto_1 = __importDefault(require("crypto"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/** @internal */
function createMd5(value) {
    return crypto_1.default.createHash("md5").update(value).digest("hex");
}
/** @internal */
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/** @internal */
function generateRandomString(length) {
    const value = crypto_1.default.randomBytes(Math.ceil(length / 2)).toString("hex");
    return value.substr(0, length);
}
/** @internal */
function getUsedMemoryInMb() {
    return (process.memoryUsage().heapUsed / 1024 / 1024) | 0;
}
/** @internal */
function readJsonFile(filename) {
    filename = path.isAbsolute(filename) ? filename : path.join(process.cwd(), filename);
    const rawData = fs.readFileSync(filename);
    return JSON.parse(rawData.toString());
}
/** @internal */
function replaceFirstLine(paragraph, firstline) {
    return paragraph.replace(/^.*/, firstline);
}
/** @internal */
function updateStack(stack, error) {
    if (error.name) {
        return replaceFirstLine(stack, `${error.name}: ${error.message}`);
    }
    else {
        return replaceFirstLine(stack, error.message);
    }
}
