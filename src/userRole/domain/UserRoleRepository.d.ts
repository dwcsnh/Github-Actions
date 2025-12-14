import { Repository } from "@/_lib/DDD";
import { UserRole } from "../domain/UserRole";

type UserRoleRepository = Repository<UserRole.Type> & {
    isUserInRole(userId: string, roleName: string): Promise<boolean>;
    getUserRoles(userId: string): Promise<string[]>;
    addUserToRole(userId: string, roleName: string): Promise<void>;
    removeUserFromRole(userId: string, roleName: string): Promise<void>;
} 