import { BaseEntity } from "./BaseEntity";
export declare class CompositeIndexExporter {
    private _entities;
    addEntity(classObjects: typeof BaseEntity, options?: {
        kind: string;
    }): void;
    addEntity(classObjects: Array<typeof BaseEntity>): void;
    getYaml(): string;
    exportTo(filename: string): void;
}
