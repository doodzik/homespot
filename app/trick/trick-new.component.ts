import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Trick }        from './trick';
import { TrickService } from './trick.service';

@Component({
  selector:    'trick-new',
  templateUrl: 'app/trick/trick-new.component.html',
  styleUrls:   ['app/trick/trick-detail.component.css'],
})
export class TrickNewComponent implements OnInit {

  trick: Trick;
  error: any;

  constructor(
    private trickService: TrickService,
    private route:         ActivatedRoute) {
  }

  ngOnInit() {
    this.trick = new Trick();
  }

  goBack() {
    window.history.back();
  }

  save() {
    this.trickService
        .save(this.trick)
        .then(trick => {
          this.trick = trick; // saved hero, w/ id if new
          this.goBack();
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
}



