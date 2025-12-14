import { withMongoProvider } from "@/_lib/MongoProvider";
import { container, initialize } from "@/container";
import { makeModule } from "@/context";
import { register } from "tsconfig-paths";
import { initRoleCollection, RoleCollection } from "./infrastructure/RoleCollection";
import { RoleRepository } from "./domain/RoleRepository";
import { CreateRole, makeCreateRole } from "./application/useCases/CreateRole";
import { DeleteRole, makeDeleteRole } from "./application/useCases/DeleteRole";
import { toContainerValues } from "@/_lib/di/containerAdapters";
import { asFunction } from "awilix";
import { makeMongoRoleRepository } from "./infrastructure/MongoRoleRepository";
import { makeRoleController } from "./interface/http/roleController";

const roleModule = makeModule('role', async ({ container: { register }, initialize }) => {
    const [collections] = await initialize(
        withMongoProvider({
            roleCollection: initRoleCollection,
        })
    );

    register({
        ...toContainerValues(collections),
        roleRepository: asFunction(makeMongoRoleRepository),
        createRole: asFunction(makeCreateRole),
        deleteRole: asFunction(makeDeleteRole),
    });

    await initialize(makeRoleController);
});

type RoleRegistry = {
    roleCollection: RoleCollection;
    roleRepository: RoleRepository;
    createRole: CreateRole;
    deleteRole: DeleteRole;
};

export { roleModule };
export type { RoleRegistry };