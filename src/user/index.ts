import { makeModule } from "@/context";
import { initUserCollection, UserCollection } from "./infrastructure/UserCollection";
import { UserRepository } from "./domain/UserRepository";
import { CreateUser, makeCreateUser } from "./application/useCases/CreateUser";
import { FindUserById, makeFindUserById } from "./application/query/FindUserById";
import { DeleteUser, makeDeleteUser } from "./application/useCases/DeleteUser";
import { withMongoProvider } from "@/_lib/MongoProvider";
import { toContainerValues } from "@/_lib/di/containerAdapters";
import { asFunction } from "awilix";
import { makeMongoUserRepository } from "./infrastructure/MongoUserRepository";
import { makeUserController } from "./interface/http/userController";

const userModule = makeModule('user', async ({ container: { register }, initialize }) => {
    const [collections] = await initialize(
        withMongoProvider({
            userCollection: initUserCollection,
        })
    );

    register({
        ...toContainerValues(collections),
        userRepository: asFunction(makeMongoUserRepository),
        createUser: asFunction(makeCreateUser),
        findUserById: asFunction(makeFindUserById),
        deleteUser: asFunction(makeDeleteUser),
    });

    await initialize(makeUserController);
})

type UserRegistry = {
    userCollection: UserCollection;
    userRepository: UserRepository;
    createUser: CreateUser;
    findUserById: FindUserById;
    deleteUser: DeleteUser;
};

export { userModule };
export type { UserRegistry };