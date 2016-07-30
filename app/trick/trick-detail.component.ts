import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Trick }        from './trick';
import { TrickService } from './trick.service';

@Component({
  selector:    'my-trick-detail',
  templateUrl: 'app/trick/trick-detail.component.html',
  styleUrls:   ['app/trick/trick-detail.component.css'],
})
export class TrickDetailComponent implements OnInit, OnDestroy {
  @Input() trick: Trick;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; // true if navigated here

  constructor(
    private trickService: TrickService,
    private route:       ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.trickService.getTrick(id)
            .then(trick => this.trick = trick);
      } else {
        this.navigated = false;
        this.trick = new Trick();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedTrick: Trick = null) {
    this.close.emit(savedTrick);
    window.history.back()
  }

  save() {
    this.trickService
        .save(this.trick)
        .then(trick => {
          this.trick = trick; // saved trick, w/ id if new
          this.goBack(trick);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  delete(event: any) {
    event.stopPropagation();
    this.trickService
        .delete(this.trick)
        .then(res => {
          this.trick = null; // saved trick, w/ id if new
          this.goBack();
        })
        .catch(error => this.error = error);
  }

}
