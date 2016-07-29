import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Prefix }        from './prefix';
import { PrefixService } from './prefix.service';

@Component({
  selector:    'prefix-new',
  templateUrl: 'app/prefix/prefix-new.component.html',
  styleUrls:   ['app/trick-detail.component.css'],
})
export class PrefixNewComponent implements OnInit {

  prefix: Prefix;
  error: any;

  constructor(
    private prefixService: PrefixService,
    private route:         ActivatedRoute) {
  }

  ngOnInit() {
    this.prefix = new Prefix();
  }

  goBack() {
    window.history.back();
  }

  save() {
    this.prefixService
        .save(this.prefix)
        .then(prefix => {
          this.prefix = prefix; // saved hero, w/ id if new
          this.goBack();
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
}


