import { AggregateRoot } from '@/_lib/DDD';
import { makeWithInvariants } from '@/_lib/WithInvariants';
import { ArticleId } from '@/_sharedKernel/domain/ArticleId';
import { UserId } from '@/_sharedKernel/domain/UserId';

namespace Article {
  type Article = AggregateRoot<ArticleId, UserId> &
    Readonly<{
      title: string;
      content: string;
      state: 'DRAFT' | 'PUBLISHED' | 'DELETED';
      publishedAt: Date | null;
    }>;

  type PublishedArticle = Omit<Article, 'publishedAt' | 'state'> & Readonly<{ state: 'PUBLISHED'; publishedAt: Date }>;

  const withInvariants = makeWithInvariants<Article>((self, assert) => {
    assert(self.title?.length > 0);
    assert(self.content?.length > 0);
  });

  type ArticleProps = Readonly<{
    id: ArticleId;
    title: string;
    content: string;
  }>;

  export const create = withInvariants(
    (props: ArticleProps): Article => ({
      id: props.id,
      title: props.title,
      content: props.content,
      state: 'DRAFT',
      publishedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
      version: 0,
    })
  );

  export const publish = withInvariants(
    (self: Article): PublishedArticle => ({
      ...self,
      state: 'PUBLISHED',
      publishedAt: new Date(),
    })
  );

  export const markAsDeleted = withInvariants(
    (self: Article): Article => ({
      ...self,
      state: 'DELETED',
      deleted: true
    })
  );

  export const changeTitle = withInvariants(
    (self: Article, title: string): Article => ({
      ...self,
      title,
    })
  );

  export const isPublished = (self: Article): self is PublishedArticle => self.state === 'PUBLISHED';

  export type Type = Article;
}

export { Article };
