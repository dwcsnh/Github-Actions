import { Comment } from '@/comment/domain/Comment';
import { Repository } from '@/_lib/DDD';

type CommentRepository = Repository<Comment.Type>;

export { CommentRepository };
