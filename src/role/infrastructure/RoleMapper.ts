import { AggregateRootDTO, DataMapper } from "@/_lib/DDD";
import { Role } from "../domain/Role";
import { RoleSchema } from "./RoleCollection";
import { from } from 'uuid-mongodb';
import { RoleIdProvider } from './RoleIdProvider';
import { UserIdProvider } from '@/_sharedKernel/infrastructure/UserIdProvider';

const RoleMapper: DataMapper<Role.Type, RoleSchema, AggregateRootDTO<Role.Type>> = {
    toData: (entity: Role.Type) => ({
        _id: from(entity.id.value),
        name: entity.name,
        deleted: entity.deleted,
        createdAt: entity.createdAt,
        createdBy: entity.createdBy ? from(entity.createdBy.value) : undefined,
        updatedAt: entity.updatedAt,
        updatedBy: entity.updatedBy ? from(entity.updatedBy.value) : undefined,
        version: entity.version,
    }),
    toEntity: (data: RoleSchema) => ({
        id: RoleIdProvider.create(from(data._id).toString()),
        name: data.name,
        deleted: data.deleted,
        createdAt: data.createdAt,
        createdBy: data.createdBy ? UserIdProvider.create(from(data.createdBy).toString()) : undefined,
        updatedAt: data.updatedAt,
        updatedBy: data.updatedBy ? UserIdProvider.create(from(data.updatedBy).toString()) : undefined,
        version: data.version,
    }),
    toDTO: (entity: Role.Type) => ({
        id: entity.id,
        name: entity.name,
    })
};

export { RoleMapper };