import { UserRole } from "../domain/UserRole";
import { UserRoleRepository } from "../domain/UserRoleRepository";
import { UserRoleCollection } from "./UserRoleCollection";
import { UserRoleId } from "../domain/UserRoleId";
import { UserRoleIdProvider } from "./UserRoleIdProvider";
import { NotFoundError } from "@/_lib/errors/NotFoundError";
import { from, v4 } from "uuid-mongodb";
import { UserRoleMapper } from "./UserRoleMapper";
import { RoleRepository } from "@/role/domain/RoleRepository";
import { UserIdProvider } from "@/_sharedKernel/infrastructure/UserIdProvider";

type Dependencies = {
    userRoleCollection: UserRoleCollection;
    roleRepository: RoleRepository;
};

const makeMongoUserRoleRepository = ({ userRoleCollection, roleRepository }: Dependencies): UserRoleRepository => ({
    async getNextId(): Promise<UserRoleId> {
        return Promise.resolve(UserRoleIdProvider.create(v4().toString()));
    },
    async findById(id: string): Promise<UserRole.Type> {
        const userRole = await userRoleCollection.findOne({ _id: from(id), deleted: false });

        if (!userRole) {
            throw NotFoundError.create('User role not found');
        }

        return UserRoleMapper.toEntity(userRole);
    },
    async store(entity: UserRole.Type): Promise<void> {
        const { _id, version, ...data } = UserRoleMapper.toData(entity);

        const count = await userRoleCollection.countDocuments({ _id });

        if (count) {
            await userRoleCollection.updateOne(
                { _id, version, deleted: false },
                {
                    $set: {
                        ...data,
                        updatedAt: new Date(),
                        version: version + 1,
                    },
                }
            );

            return;
        }

        await userRoleCollection.insertOne({
            _id,
            ...data,
            version,
        });
    },
    async isUserInRole(userId: string, roleName: string): Promise<boolean> {
        const role = await roleRepository.findByName(roleName);
        const userRole = await userRoleCollection.findOne({
            userId: from(userId),
            roleId: from(role.id.value),
            deleted: false
        });

        return !!userRole;
    },
    async getUserRoles(userId: string): Promise<string[]> {
        const userRoles = await userRoleCollection.find({ userId: from(userId), deleted: false }).toArray();

        const roles = userRoles.map(async (userRole) => {
            const role = await roleRepository.findById(from(userRole.roleId).toString());
            return role.name;
        });

        return Promise.all(roles);
    },
    async addUserToRole(userId: string, roleName: string): Promise<void> {
        if (await this.isUserInRole(userId, roleName)) {
            throw new Error('User already in role');
        }
        const role = await roleRepository.findByName(roleName);
        const userRoleId = await this.getNextId();

        await this.store(UserRole.create({
            id: userRoleId,
            userId: UserIdProvider.create(userId),
            roleId: role.id
        }));
    },
    async removeUserFromRole(userId: string, roleName: string): Promise<void> {
        if (!await this.isUserInRole(userId, roleName)) {
            throw new Error('User not in role');
        }
        const role = await roleRepository.findByName(roleName);
        const userRoleData = await userRoleCollection.findOne({
            userId: from(userId),
            roleId: from(role.id.value),
            deleted: false
        });

        if (userRoleData) {
            const userRole = UserRoleMapper.toEntity(userRoleData);
            await this.store(UserRole.markAsDeleted(userRole));
        }
    }
});

export { makeMongoUserRoleRepository }; 