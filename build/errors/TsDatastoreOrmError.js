"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsDatastoreOrmError = void 0;
class TsDatastoreOrmError extends Error {
    constructor(message) {
        super(message);
        this.name = "TsDatastoreOrmError";
        Object.setPrototypeOf(this, TsDatastoreOrmError.prototype);
    }
}
exports.TsDatastoreOrmError = TsDatastoreOrmError;
