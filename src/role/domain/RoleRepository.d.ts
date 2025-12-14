import { Repository } from "@/_lib/DDD";
import { Role } from "./Role";

type RoleRepository = Repository<Role.Type> & {
    findByName(name: string): Promise<Role.Type>;
}

export type { RoleRepository };