import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Obstacle }        from './obstacle';
import { ObstacleService } from './obstacle.service';

@Component({
  selector:    'obstacle-new',
  templateUrl: 'app/obstacle/obstacle-new.component.html',
  styleUrls:   ['app/trick/trick-detail.component.css'],
})
export class ObstacleNewComponent implements OnInit {

  obstacle: Obstacle;
  error: any;

  constructor(
    private obstacleService: ObstacleService,
    private route:         ActivatedRoute) {
  }

  ngOnInit() {
    this.obstacle = new Obstacle();
  }

  goBack() {
    window.history.back();
  }

  save() {
    this.obstacleService
        .save(this.obstacle)
        .then(obstacle => {
          this.obstacle = obstacle; // saved hero, w/ id if new
          this.goBack();
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
}


