"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const src_1 = require("@google-cloud/datastore/build/src/");
const decoratorMeta_1 = require("./decoratorMeta");
class BaseEntity {
    constructor() {
        const entityMeta = decoratorMeta_1.decoratorMeta.entityMetaMap.get(this.constructor);
        // we need to pre-fill the followings
        this._kind = entityMeta.kind;
        this._namespace = entityMeta.namespace;
        Object.defineProperty(this, "_kind", {
            value: entityMeta.kind,
            enumerable: entityMeta.enumerable,
            writable: true,
            configurable: true,
        });
        Object.defineProperty(this, "_namespace", {
            value: entityMeta.namespace,
            enumerable: entityMeta.enumerable,
            writable: true,
            configurable: true,
        });
        Object.defineProperty(this, "_ancestorKey", {
            value: undefined,
            enumerable: entityMeta.enumerable,
            writable: true,
            configurable: true,
        });
    }
    getKey() {
        const key = new src_1.Key({ namespace: this._namespace, path: [this._kind] });
        if (typeof this._id === "number") {
            key.id = this._id.toString();
        }
        else if (typeof this._id === "string") {
            key.name = this._id;
        }
        if (this._ancestorKey) {
            key.parent = this._ancestorKey;
        }
        return key;
    }
}
exports.BaseEntity = BaseEntity;
