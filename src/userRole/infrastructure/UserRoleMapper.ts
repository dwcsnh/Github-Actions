import { DataMapper } from "@/_lib/DDD";
import { UserRole } from "../domain/UserRole";
import { UserRoleSchema } from "./UserRoleCollection";
import { from } from "uuid-mongodb";
import { UserIdProvider } from "@/_sharedKernel/infrastructure/UserIdProvider";
import { RoleIdProvider } from "@/role/infrastructure/RoleIdProvider";
import { AggregateRootDTO } from "@/_lib/DDD";
import { UserRoleIdProvider } from "./UserRoleIdProvider";

const UserRoleMapper: DataMapper<UserRole.Type, UserRoleSchema, AggregateRootDTO<UserRole.Type>> = {
    toData: (entity: UserRole.Type) => ({
        _id: from(entity.id.value),
        userId: from(entity.userId.value),
        roleId: from(entity.roleId.value),
        createdAt: entity.createdAt,
        createdBy: entity.createdBy ? from(entity.createdBy.value) : undefined,
        updatedAt: entity.updatedAt,
        updatedBy: entity.updatedBy ? from(entity.updatedBy.value) : undefined,
        deleted: entity.deleted,
        version: entity.version
    }),

    toEntity: (data: UserRoleSchema) => ({
        id: UserRoleIdProvider.create(from(data._id).toString()),
        userId: UserIdProvider.create(from(data.userId).toString()),
        roleId: RoleIdProvider.create(from(data.roleId).toString()),
        createdAt: data.createdAt,
        createdBy: data.createdBy ? UserIdProvider.create(from(data.createdBy).toString()) : undefined,
        updatedAt: data.updatedAt,
        updatedBy: data.updatedBy ? UserIdProvider.create(from(data.updatedBy).toString()) : undefined,
        deleted: data.deleted,
        version: data.version,
    }),

    toDTO: (entity: UserRole.Type) => ({
        id: entity.id,
        userId: entity.userId,
        roleId: entity.roleId,
    })
};

export { UserRoleMapper };
