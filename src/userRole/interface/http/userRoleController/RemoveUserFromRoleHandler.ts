import { handler } from "@/_lib/http/handler";
import { makeValidator } from "@/_lib/http/validation/Validator";
import { RemoveUserFromRole } from "@/userRole/application/useCases/RemoveUserFromRole";
import Joi from "types-joi";
import { HttpStatus } from "@/_lib/http/HttpStatus";

type Dependencies = {
    removeUserFromRole: RemoveUserFromRole;
};

const { getQuery } = makeValidator({
    query: Joi.object({
        userId: Joi.string().required(),
        roleName: Joi.string().required(),
    }).required(),
});

const removeUserFromRoleHandler = handler(({ removeUserFromRole }: Dependencies) => async (req, res) => {
    const { userId, roleName } = getQuery(req);

    await removeUserFromRole({ userId, roleName });

    res.status(HttpStatus.NO_CONTENT).send();
});

export { removeUserFromRoleHandler };
