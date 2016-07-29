import { RouterConfig } from '@angular/router';

import { PrefixesComponent }           from './prefixes.component';
import { PrefixDetailComponent }       from './prefix-detail.component';
import { PrefixNewComponent }          from './prefix-new.component';

export const PrefixRoutes: RouterConfig = [
  {
    path: 'prefixes',
    component: PrefixesComponent
  },
  {
    path: 'prefix/new',
    component: PrefixNewComponent
  },
  {
    path: 'prefix/:id',
    component: PrefixDetailComponent
  },
]
