import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Obstacle }        from './obstacle';
import { ObstacleService } from './obstacle.service';

@Component({
  selector:    'obstacle-detail',
  templateUrl: './app/obstacle/obstacle-detail.component.html',
  styleUrls:   ['app/trick/trick-detail.component.css'],
})
export class ObstacleDetailComponent implements OnInit, OnDestroy {
  @Input() obstacle: Obstacle;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;

  constructor(
    private obstacleService: ObstacleService,
    private route:         ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.obstacleService.getObstacle(id)
          .then(obstacle => this.obstacle = obstacle);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.obstacleService
        .save(this.obstacle)
        .then(obstacle => {
          this.obstacle = obstacle; // saved hero, w/ id if new
          this.goBack(obstacle);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  delete(event: any) {
    event.stopPropagation();
    this.obstacleService
        .delete(this.obstacle)
        .then(res => {
          this.obstacle = null
          this.goBack(this.obstacle);
        })
        .catch(error => this.error = error);
  }

  goBack(savedObstacle: Obstacle = null) {
    this.close.emit(savedObstacle);
    window.history.back();
  }
}

