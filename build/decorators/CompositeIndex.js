"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeIndex = CompositeIndex;
const decoratorMeta_1 = require("../decoratorMeta");
function CompositeIndex(fields = {}, hasAncestor = false) {
    return (target) => {
        decoratorMeta_1.decoratorMeta.addEntityCompositeIndex(target, fields, hasAncestor);
    };
}
