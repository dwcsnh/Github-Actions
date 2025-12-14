import { ApplicationService } from "@/_lib/DDD";
import { Role } from "@/role/domain/Role";
import { RoleRepository } from "@/role/domain/RoleRepository"

type Dependencies = {
    roleRepository: RoleRepository;
};

type DeleteRole = ApplicationService<string, void>;

const makeDeleteRole =
    ({ roleRepository }: Dependencies): DeleteRole =>
        async (payload) => {
            const role = await roleRepository.findById(payload);

            await Role.markAsDeleted(role);

            await roleRepository.store(role);
        };

export { makeDeleteRole };
export type { DeleteRole };