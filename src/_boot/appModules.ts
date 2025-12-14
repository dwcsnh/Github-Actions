import { articleModule, ArticleRegistry } from '@/article';
import { commentModule, CommentRegistry } from '@/comment';
import { roleModule, RoleRegistry } from '@/role';
import { userModule, UserRegistry } from '@/user';
import { userRoleModule, UserRoleRegistry } from '@/userRole';
import { authModule, AuthRegistry } from '@/auth';

// eslint-disable-next-line @typescript-eslint/ban-types
type AppModulesConfig = {};

const appModules = [articleModule, commentModule, userModule, roleModule, userRoleModule, authModule];

type AppModulesRegistry = ArticleRegistry & CommentRegistry & UserRegistry & RoleRegistry & UserRoleRegistry & AuthRegistry;

export { appModules };
export type { AppModulesConfig, AppModulesRegistry };
