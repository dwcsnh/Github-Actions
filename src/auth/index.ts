import { asFunction } from "awilix";
import { makeModule } from "@/context";
import { makeSignIn } from "./application/useCases/SignIn";
import { makeAuthController } from "./interface/http/authController";
import { requireSignedIn, RequireSignedIn } from "./interface/http/middleware/requireSignedIn";
import { requireRole, RequireRole } from "./interface/http/middleware/requireRole";
import { SignIn } from "./application/useCases/SignIn";
import { SignUp } from "./application/useCases/SignUp";
import { makeSignUp } from "./application/useCases/SignUp";

const authModule = makeModule("auth", async ({ container: { register }, initialize }) => {
    register({
        signIn: asFunction(makeSignIn),
        signUp: asFunction(makeSignUp)
    });

    await initialize(makeAuthController);
});

type AuthRegistry = {
    signIn: SignIn;
    signUp: SignUp;
}

export { authModule, requireSignedIn, requireRole };
export type { AuthRegistry, RequireSignedIn, RequireRole };
