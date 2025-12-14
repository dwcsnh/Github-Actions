import { Collection, Db } from "mongodb";
import { MUUID } from "uuid-mongodb";

type UserRoleSchema = {
    _id: MUUID;
    userId: MUUID;
    roleId: MUUID;
    createdAt: Date;
    createdBy?: MUUID;
    updatedAt: Date;
    updatedBy?: MUUID;
    deleted: boolean;
    version: number;
};

type UserRoleCollection = Collection<UserRoleSchema>;

const initUserRoleCollection = async (db: Db): Promise<UserRoleCollection> => {
    const collection: UserRoleCollection = db.collection('userRole');

    await collection.createIndex({ userId: 1, roleId: 1 }, { unique: true });
    await collection.createIndex({ userId: 1, deleted: 1 });

    return collection;
};

export { initUserRoleCollection };
export type { UserRoleSchema, UserRoleCollection };
