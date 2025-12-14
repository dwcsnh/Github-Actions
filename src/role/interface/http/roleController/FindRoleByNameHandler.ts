import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { RoleRepository } from "@/role/domain/RoleRepository"
import { RoleMapper } from "@/role/infrastructure/RoleMapper";
import { makeValidator } from '@/_lib/http/validation/Validator';
import Joi from 'types-joi';

type Dependencies = {
    roleRepository: RoleRepository;
};

const { getQuery } = makeValidator({
    query: Joi.object({
        name: Joi.string().required(),
    }).required(),
});

const findRoleByNameHandler = handler(({ roleRepository }: Dependencies) => async (req, res) => {
    const { name } = getQuery(req);

    const role = await roleRepository.findByName(name);

    res.status(HttpStatus.FOUND).json(RoleMapper.toDTO(role));
});

export { findRoleByNameHandler };