import { Role } from '@/role/domain/Role';
import { RoleId } from '@/role/domain/RoleId';
import { RoleRepository } from '@/role/domain/RoleRepository';
import { RoleCollection } from './RoleCollection';
import { RoleIdProvider } from './RoleIdProvider';
import { RoleMapper } from './RoleMapper';
import { NotFoundError } from '@/_lib/errors/NotFoundError';
import { from, v4 } from 'uuid-mongodb';

type Dependencies = {
    roleCollection: RoleCollection;
};

const makeMongoRoleRepository = ({ roleCollection }: Dependencies): RoleRepository => ({
    async getNextId(): Promise<RoleId> {
        return Promise.resolve(RoleIdProvider.create(v4().toString()));
    },
    async findById(id: string): Promise<Role.Type> {
        const role = await roleCollection.findOne({ _id: from(id), deleted: false });

        if (!role) {
            throw NotFoundError.create('Role not found');
        }

        return RoleMapper.toEntity(role);
    },
    async findByName(name: string): Promise<Role.Type> {
        const role = await roleCollection.findOne({ name, deleted: false });

        if (!role) {
            throw NotFoundError.create('Role not found');
        }

        return RoleMapper.toEntity(role);
    },
    async store(entity: Role.Type): Promise<void> {
        RoleIdProvider.validate(entity.id);

        const { _id, version, ...data } = RoleMapper.toData(entity);

        const count = await roleCollection.countDocuments({ _id });

        if (count) {
            await roleCollection.updateOne(
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

        await roleCollection.insertOne({
            _id,
            ...data,
            version,
        });
    },
});

export { makeMongoRoleRepository };