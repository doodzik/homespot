import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';

import { Obstacle }                from './obstacle';
import { ObstacleService }         from './obstacle.service';

@Component({
  selector:    'my-obstacles',
  templateUrl: 'app/obstacle/obstacles.component.html',
  styleUrls:   ['app/obstacle/obstacles.component.css'],
})
export class ObstaclesComponent implements OnInit {

  obstacles: Obstacle[];
  error: any;

  constructor(
    private obstacleService: ObstacleService,
    private router: Router) { 
  }

  ngOnInit() {
    this.getObstacles();
  }

  getObstacles() {
    this.obstacleService
        .getObstacles()
        .then(heroes => this.obstacles = heroes)
        .catch(error => this.error = error);
  }

  new() {
    let link = ['/obstacle/new'];
    this.router.navigate(link);
  }

  show(obstacle: Obstacle) {
    let link = ['/obstacle', obstacle.id];
    this.router.navigate(link);
  }
}
