import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import { SignIn } from "@/auth/application/useCases/SignIn";
import Joi from "types-joi";

type Dependencies = {
    signIn: SignIn;
};

const { getBody } = makeValidator({
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }).required(),
});

const signInHandler = handler(({ signIn }: Dependencies) => async (req, res) => {
    const { username, password } = getBody(req);

    const { token } = await signIn({ username, password });

    res.status(HttpStatus.OK).json({ token });
});

export { signInHandler };
