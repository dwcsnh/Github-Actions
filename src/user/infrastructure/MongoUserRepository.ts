import { UserCollection } from "./UserCollection"
import { UserRepository } from "../domain/UserRepository";
import { UserId } from '@/_sharedKernel/domain/UserId';
import { User } from "@/user/domain/User";
import { UserIdProvider } from "@/_sharedKernel/infrastructure/UserIdProvider";
import { from, v4 } from "uuid-mongodb";
import { UserMapper } from "./UserMapper";
import { NotFoundError } from "@/_lib/errors/NotFoundError";

type Dependencies = {
    userCollection: UserCollection;
};

const makeMongoUserRepository = ({ userCollection }: Dependencies): UserRepository => ({
    async getNextId(): Promise<UserId> {
        return Promise.resolve(UserIdProvider.create(v4().toString()));
    },
    async store(entity: User.Type): Promise<void> {
        const { _id, version, ...data } = UserMapper.toData(entity);

        const count = await userCollection.count({ _id });

        if (count) {
            await userCollection.updateOne(
                { _id, version, deleted: false },
                {
                    $set: {
                        ...data,
                        updatedAt: new Date(),
                        version: version + 1
                    },
                }
            );

            return;
        }

        await userCollection.insertOne({
            _id,
            ...data,
            version,
        });
    },
    async findById(id: string): Promise<User.Type> {
        const user = await userCollection.findOne({
            _id: from(id),
            deleted: false
        });

        if (user) {
            return UserMapper.toEntity(user);
        } else {
            throw NotFoundError.create();
        }
    },
    async findByUsername(username: string): Promise<User.Type> {
        const user = await userCollection.findOne({
            username: username,
            deleted: false
        });

        if (user) {
            return UserMapper.toEntity(user);
        } else {
            throw NotFoundError.create();
        }
    }
});

export { makeMongoUserRepository };