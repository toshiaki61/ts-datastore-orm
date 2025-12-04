"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameKey = exports.isSamePath = exports.isSameKind = exports.isSameNamespace = void 0;
const isSameNamespace = (key1, key2) => {
    return key1.namespace === key2.namespace;
};
exports.isSameNamespace = isSameNamespace;
const isSameKind = (key1, key2) => {
    return key1.kind === key2.kind;
};
exports.isSameKind = isSameKind;
const isSamePath = (key1, key2) => {
    const path1 = key1.path;
    const path2 = key2.path;
    for (let i = 0; i < Math.max(path1.length, path2.length); i++) {
        if (path1[i] !== path2[i]) {
            return false;
        }
    }
    return true;
};
exports.isSamePath = isSamePath;
const isSameKey = (key1, key2) => {
    return (0, exports.isSameNamespace)(key1, key2) && (0, exports.isSameKind)(key1, key2) && (0, exports.isSamePath)(key1, key2);
};
exports.isSameKey = isSameKey;
