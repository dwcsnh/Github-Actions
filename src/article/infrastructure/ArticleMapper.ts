import { Article } from '@/article/domain/Article';
import { ArticleSchema } from '@/article/infrastructure/ArticleCollection';
import { AggregateRootDTO, DataMapper } from '@/_lib/DDD';
import { ArticleIdProvider } from '@/_sharedKernel/infrastructure/ArticleIdProvider';
import { from } from 'uuid-mongodb';
import { UserIdProvider } from '@/_sharedKernel/infrastructure/UserIdProvider';

const ArticleMapper: DataMapper<Article.Type, ArticleSchema, AggregateRootDTO<Article.Type>> = {
  toData: (entity: Article.Type) => ({
    _id: from(entity.id.value),
    title: entity.title,
    content: entity.content,
    status: entity.state,
    publishedAt: entity.publishedAt,
    createdAt: entity.createdAt,
    createdBy: entity.createdBy ? from(entity.createdBy.value) : undefined,
    deleted: entity.state === 'DELETED',
    updatedAt: entity.updatedAt,
    updatedBy: entity.updatedBy ? from(entity.updatedBy.value) : undefined,
    version: entity.version,
  }),
  toEntity: (data: ArticleSchema) => ({
    id: ArticleIdProvider.create(from(data._id).toString()),
    title: data.title,
    content: data.content,
    state: data.status,
    publishedAt: data.publishedAt,
    createdAt: data.createdAt,
    createdBy: data.createdBy ? UserIdProvider.create(from(data.createdBy).toString()) : undefined,
    updatedAt: data.updatedAt,
    updatedBy: data.updatedBy ? UserIdProvider.create(from(data.updatedBy).toString()) : undefined,
    deleted: data.deleted,
    version: data.version,
  }),
  toDTO: (entity: Article.Type) => ({
    id: entity.id,
    title: entity.title,
    content: entity.content,
    state: entity.state,
    publishedAt: entity.publishedAt,
  })
};

export { ArticleMapper };
