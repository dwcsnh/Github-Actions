import { Collection, Db } from "mongodb";
import { MUUID } from "uuid-mongodb"

type RoleSchema = {
    _id: MUUID;
    name: string;
    deleted: boolean;
    createdAt: Date;
    createdBy?: MUUID;
    updatedAt: Date;
    updatedBy?: MUUID;
    version: number;
};

type RoleCollection = Collection<RoleSchema>;

const initRoleCollection = async (db: Db): Promise<RoleCollection> => {
    const collection: RoleCollection = db.collection('role');

    await collection.createIndex({ name: 1 }, { unique: true });
    await collection.createIndex({ _id: 1, deleted: 1 });
    await collection.createIndex({ name: 1, deleted: 1 });

    return collection;
};

export { initRoleCollection };
export type { RoleSchema, RoleCollection };