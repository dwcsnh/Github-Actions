import { withMongoProvider } from "@/_lib/MongoProvider";
import { makeModule } from "@/context";
import { initUserRoleCollection } from "./infrastructure/UserRoleCollection";
import { UserRoleRepository } from "./domain/UserRoleRepository";
import { GetUserRoles } from "./application/query/GetUserRoles";
import { AddUserToRole } from "./application/useCases/AddUserToRole";
import { RemoveUserFromRole } from "./application/useCases/RemoveUserFromRole";
import { makeMongoUserRoleRepository } from "./infrastructure/MongoUserRoleRepository";
import { makeGetUserRoles } from "./application/query/GetUserRoles";
import { makeAddUserToRole } from "./application/useCases/AddUserToRole";
import { makeRemoveUserFromRole } from "./application/useCases/RemoveUserFromRole";
import { UserRoleCollection } from "./infrastructure/UserRoleCollection";
import { toContainerValues } from "@/_lib/di/containerAdapters";
import { asFunction } from "awilix";
import { makeUserRoleController } from "./interface/http/userRoleController";

const userRoleModule = makeModule("userRole", async ({ container: { register }, initialize }) => {
    const [collections] = await initialize(
        withMongoProvider({
            userRoleCollection: initUserRoleCollection,
        })
    );

    register({
        ...toContainerValues(collections),
        userRoleRepository: asFunction(makeMongoUserRoleRepository),
        getUserRoles: asFunction(makeGetUserRoles),
        addUserToRole: asFunction(makeAddUserToRole),
        removeUserFromRole: asFunction(makeRemoveUserFromRole),
    })

    await initialize(makeUserRoleController);
});

type UserRoleRegistry = {
    userRoleCollection: UserRoleCollection;
    userRoleRepository: UserRoleRepository;
    getUserRoles: GetUserRoles;
    addUserToRole: AddUserToRole;
    removeUserFromRole: RemoveUserFromRole;
};

export { userRoleModule };
export type { UserRoleRegistry };
