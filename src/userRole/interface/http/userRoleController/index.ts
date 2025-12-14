import { Router } from "express";
import { getUserRolesHandler } from "./GetUserRolesHandler";
import { addUserToRoleHandler } from "./AddUserToRoleHandler";
import { removeUserFromRoleHandler } from "./RemoveUserFromRoleHandler";
import { requireRole } from "@/auth";

type Dependencies = {
    apiRouter: Router;
};

const makeUserRoleController = ({ apiRouter }: Dependencies) => {
    const router = Router();

    router.get('/userRoles/:userId', getUserRolesHandler);
    router.post('/userRoles', requireRole('Admin'), addUserToRoleHandler);
    router.delete('/userRoles', removeUserFromRoleHandler);

    apiRouter.use(router);
};

export { makeUserRoleController };
