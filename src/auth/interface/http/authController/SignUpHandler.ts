import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import Joi from "types-joi";
import { SignUp } from "@/auth/application/useCases/SignUp";
import { Gender } from "@/_sharedKernel/domain/types/User/User";

type Dependencies = {
    signUp: SignUp;
};

const { getBody } = makeValidator({
    body: Joi.object({
        username: Joi.string().required(),
        familyName: Joi.string().required(),
        givenName: Joi.string().required(),
        gender: Joi.string().valid('MALE', 'FEMALE').required(),
        birthday: Joi.date().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).required(),
});

const signUpHandler = handler(({ signUp }: Dependencies) => async (req, res) => {
    const { username, familyName, givenName, gender, birthday, email, password } = getBody(req);

    const { token } = await signUp({ username, familyName, givenName, gender: gender as Gender, birthday, email, password });

    res.status(HttpStatus.OK).json({ token });
});

export { signUpHandler };

