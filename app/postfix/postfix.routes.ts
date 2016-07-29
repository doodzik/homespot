import { RouterConfig } from '@angular/router';

import { PostfixesComponent }           from './postfixes.component';
import { PostfixDetailComponent }       from './postfix-detail.component';
import { PostfixNewComponent }          from './postfix-new.component';

export const PostfixRoutes: RouterConfig = [
  {
    path: 'postfixes',
    component: PostfixesComponent
  },
  {
    path: 'postfix/new',
    component: PostfixNewComponent
  },
  {
    path: 'postfix/:id',
    component: PostfixDetailComponent
  },
]
