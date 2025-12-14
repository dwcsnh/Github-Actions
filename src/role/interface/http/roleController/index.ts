import { Router } from "express"
import { findRoleByIdHandler } from "./FindRoleByIdHandler";
import { findRoleByNameHandler } from "./FindRoleByNameHandler";
import { createRoleHandler } from "./CreateRoleHandler";
import { deleteRoleHandler } from "./DeleteRoleHandler";
import { requireRole } from "@/auth";

type Dependencies = {
    apiRouter: Router;
};

const makeRoleController = ({ apiRouter }: Dependencies) => {
    const router = Router();

    router.get('/roles/:roleId', findRoleByIdHandler);
    router.get('/roles', findRoleByNameHandler);
    router.post('/roles', requireRole('Admin'), createRoleHandler);
    router.delete('/roles', deleteRoleHandler);

    apiRouter.use(router);
};

export { makeRoleController };