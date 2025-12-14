import { Router } from "express"
import { createUserHandler } from "./CreateUserHandler";
import { deleteUserHandler } from "./DeleteUserHandler";
import { findUserByIdHandler } from "./FindUserByIdHandler";

type Dependencies = {
    apiRouter: Router;
};

const makeUserController = ({ apiRouter }: Dependencies) => {
    const router = Router();

    router.get('/users/:userId', findUserByIdHandler);
    router.post('/users', createUserHandler);
    router.delete('/users/:userId', deleteUserHandler);

    apiRouter.use(router);
};

export { makeUserController };