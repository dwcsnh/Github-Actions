import { Comment } from '@/comment/domain/Comment';
import { CommentSchema } from '@/comment/infrastructure/CommentCollection';
import { CommentIdProvider } from '@/comment/infrastructure/CommentIdProvider';
import { AggregateRootDTO, DataMapper } from '@/_lib/DDD';
import { ArticleIdProvider } from '@/_sharedKernel/infrastructure/ArticleIdProvider';
import { from } from 'uuid-mongodb';
import { UserIdProvider } from '@/_sharedKernel/infrastructure/UserIdProvider';

const CommentMapper: DataMapper<Comment.Type, CommentSchema, AggregateRootDTO<Comment.Type>> = {
  toData: (entity) => ({
    _id: from(entity.id.value),
    body: entity.body,
    articleId: from(entity.articleId.value),
    status: entity.status,
    deleted: entity.status === 'DELETED',
    createdAt: entity.createdAt,
    createdBy: entity.createdBy ? from(entity.createdBy.value) : undefined,
    updatedAt: entity.updatedAt,
    updatedBy: entity.updatedBy ? from(entity.updatedBy.value) : undefined,
    version: entity.version,
  }),
  toEntity: (data) => ({
    id: CommentIdProvider.create(from(data._id).toString()),
    body: data.body,
    articleId: ArticleIdProvider.create(from(data.articleId).toString()),
    status: data.status,
    createdAt: data.createdAt,
    createdBy: data.createdBy ? UserIdProvider.create(from(data.createdBy).toString()) : undefined,
    updatedAt: data.createdAt,
    updatedBy: data.updatedBy ? UserIdProvider.create(from(data.updatedBy).toString()) : undefined,
    deleted: data.deleted,
    version: data.version,
  }),
  toDTO: (entity) => ({
    id: entity.id,
    body: entity.body,
    articleId: entity.articleId,
    status: entity.status,
  })
};

export { CommentMapper };
