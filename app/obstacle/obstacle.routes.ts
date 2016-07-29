import { RouterConfig } from '@angular/router';

import { ObstaclesComponent }           from './obstacles.component';
import { ObstacleDetailComponent }       from './obstacle-detail.component';
import { ObstacleNewComponent }          from './obstacle-new.component';

export const ObstacleRoutes: RouterConfig = [
  {
    path: 'obstacles',
    component: ObstaclesComponent
  },
  {
    path: 'obstacle/new',
    component: ObstacleNewComponent
  },
  {
    path: 'obstacle/:id',
    component: ObstacleDetailComponent
  },
]
