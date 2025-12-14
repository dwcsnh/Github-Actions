import { Router } from "express";
import { signInHandler } from "./SignInHandler";
import { signUpHandler } from "./SignUpHandler";

type Dependencies = {
    apiRouter: Router;
};

const makeAuthController = ({ apiRouter }: Dependencies) => {
    const router = Router();

    router.post('/auth/signin', signInHandler);
    router.post('/auth/signup', signUpHandler);

    apiRouter.use(router);
};

export { makeAuthController };
