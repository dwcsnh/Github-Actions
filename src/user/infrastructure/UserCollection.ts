import { Gender } from "@/_sharedKernel/domain/types/User/User";
import { Collection, Db } from "mongodb";
import { MUUID } from "uuid-mongodb"

type UserSchema = {
    _id: MUUID;
    username: string;
    familyName: string;
    givenName: string;
    gender: Gender
    birthday: Date;
    email: string;
    password: string;
    createdAt: Date;
    createdBy?: MUUID;
    updatedAt: Date;
    updatedBy?: MUUID;
    deleted: boolean;
    version: number;
}

type UserCollection = Collection<UserSchema>;

const initUserCollection = async (db: Db): Promise<UserCollection> => {
    const collection: UserCollection = db.collection('user');

    await collection.createIndex({ username: 1 }, { unique: true });
    await collection.createIndex({ username: 1, deleted: 1 });
    await collection.createIndex({ _id: 1, version: 1 });

    return collection;
};

export { initUserCollection };
export type { UserSchema, UserCollection };