import { Article } from '@/article/domain/Article';
import { Repository } from '@/_lib/DDD';

type ArticleRepository = Repository<Article.Type>;

export { ArticleRepository };
