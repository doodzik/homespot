import { provideRouter, RouterConfig } from '@angular/router';

import { DashboardComponent }          from './dashboard.companent';

import { PrefixRoutes }                from './prefix/prefix.routes';
import { PostfixRoutes }               from './postfix/postfix.routes';
import { TrickRoutes }                 from './trick/trick.routes';

const routes: RouterConfig = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
]

const allRoutes: RouterConfig = routes
                                  .concat(PrefixRoutes)
                                  .concat(PostfixRoutes)
                                  .concat(TrickRoutes)

export const appRouterProviders = [
  provideRouter(allRoutes)
];
