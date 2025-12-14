import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { RoleRepository } from "@/role/domain/RoleRepository"
import { RoleMapper } from "@/role/infrastructure/RoleMapper";

type Dependencies = {
    roleRepository: RoleRepository;
};

const findRoleByIdHandler = handler(({ roleRepository }: Dependencies) => async (req, res) => {
    const { roleId } = req.params;

    const role = await roleRepository.findById(roleId);

    res.status(HttpStatus.FOUND).json(RoleMapper.toDTO(role));
});

export { findRoleByIdHandler };