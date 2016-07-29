import { provideRouter, RouterConfig } from '@angular/router';
import { TricksComponent }             from './tricks.component';
import { DashboardComponent }          from './dashboard.companent';
import { HeroDetailComponent }         from './trick-detail.component';

import { PrefixRoutes }                from './prefix/prefix.routes';
import { PostfixRoutes }               from './postfix/postfix.routes';

const routes: RouterConfig = [
  {
    path: 'heroes',
    component: TricksComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
]

const allRoutes: RouterConfig = routes.concat(PrefixRoutes).concat(PostfixRoutes)

export const appRouterProviders = [
  provideRouter(allRoutes)
];
