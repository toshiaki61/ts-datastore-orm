"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeIndexExporter = void 0;
const fs_1 = __importDefault(require("fs"));
const decoratorMeta_1 = require("./decoratorMeta");
class CompositeIndexExporter {
    constructor() {
        this._entities = [];
    }
    addEntity(classObjects, options) {
        for (const classObject of Array.isArray(classObjects) ? classObjects : [classObjects]) {
            this._entities.push({
                classObject,
                kind: options === null || options === void 0 ? void 0 : options.kind,
            });
        }
    }
    getYaml() {
        let yaml = "indexes:\n";
        for (const entity of this._entities) {
            const entityMeta = decoratorMeta_1.decoratorMeta.getEntityMeta(entity.classObject);
            const compositeIndexList = decoratorMeta_1.decoratorMeta.getEntityCompositeIndexList(entity.classObject);
            const kind = entity.kind || entityMeta.kind;
            for (const compositeIndex of compositeIndexList) {
                yaml += "\n";
                yaml += `  - kind: ${kind}\n`;
                if (compositeIndex.hasAncestor) {
                    yaml += `    ancestor: yes\n`;
                }
                else {
                    yaml += `    ancestor: no\n`;
                }
                yaml += `    properties:\n`;
                for (let [fieldName, direction] of Object.entries(compositeIndex.fields)) {
                    if (fieldName === "_id") {
                        fieldName = "__key__";
                    }
                    yaml += `    - name: ${fieldName}\n`;
                    yaml += `      direction: ${direction}\n`;
                }
            }
        }
        return yaml;
    }
    exportTo(filename) {
        const yaml = this.getYaml();
        fs_1.default.writeFileSync(filename, yaml);
    }
}
exports.CompositeIndexExporter = CompositeIndexExporter;
