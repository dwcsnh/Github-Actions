import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import { CreateRole } from "@/role/application/useCases/CreateRole"
import Joi from "types-joi";

type Dependencies = {
    createRole: CreateRole;
};

const { getBody } = makeValidator({
    body: Joi.object({
        name: Joi.string().required(),
    }).required()
});

const createRoleHandler = handler(({ createRole }: Dependencies) => async (req, res) => {
    const { name } = getBody(req);

    const roleId = await createRole(name);

    res.status(HttpStatus.CREATED).json({ id: roleId });
});

export { createRoleHandler };