import { CommentId } from '@/comment/domain/CommentId';
import { AggregateRoot } from '@/_lib/DDD';
import { ArticleId } from '@/_sharedKernel/domain/ArticleId';
import { UserId } from '@/_sharedKernel/domain/UserId';

namespace Comment {
  type Status = 'ACTIVE' | 'DELETED';

  type Comment = AggregateRoot<CommentId, UserId> &
    Readonly<{
      body: string;
      articleId: ArticleId;
      status: Status;
    }>;

  type CommentProps = Readonly<{
    id: CommentId;
    body: string;
    articleId: ArticleId;
  }>;

  export const create = (props: CommentProps): Comment => ({
    ...props,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    version: 0,
  });

  export const markAsDeleted = (self: Comment): Comment => ({
    ...self,
    status: 'DELETED',
  });

  export type Type = Comment;
}

export { Comment };
