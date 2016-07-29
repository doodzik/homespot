import { RouterConfig } from '@angular/router';

import { TricksComponent }             from './tricks.component';
import { TrickDetailComponent }       from './trick-detail.component';
import { TrickNewComponent }          from './trick-new.component';

export const TrickRoutes: RouterConfig = [
  {
    path: 'tricks',
    component: TricksComponent
  },
  {
    path: 'trick/new',
    component: TrickNewComponent
  },
  {
    path: 'trick/:id',
    component: TrickDetailComponent
  },
]
