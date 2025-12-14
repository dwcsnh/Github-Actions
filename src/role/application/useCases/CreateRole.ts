import { ApplicationService } from "@/_lib/DDD";
import { Role } from "@/role/domain/Role";
import { RoleRepository } from "@/role/domain/RoleRepository"

type Dependencies = {
    roleRepository: RoleRepository;
};

type CreateRole = ApplicationService<string, string>;

const makeCreateRole =
    ({ roleRepository }: Dependencies): CreateRole =>
        async (payload) => {
            const id = await roleRepository.getNextId();

            const role = Role.create({
                id,
                name: payload
            });

            await roleRepository.store(role);

            return id.value;
        };

export { makeCreateRole };
export type { CreateRole };