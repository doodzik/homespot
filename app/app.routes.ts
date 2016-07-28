import { provideRouter, RouterConfig } from '@angular/router';
import { TricksComponent }             from './tricks.component';
import { DashboardComponent }          from './dashboard.companent';
import { HeroDetailComponent }         from './trick-detail.component';

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
];

export const appRouterProviders = [
  provideRouter(routes)
];
