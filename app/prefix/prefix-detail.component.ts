import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Prefix }        from './prefix';
import { PrefixService } from './prefix.service';

@Component({
  selector:    'prefix-detail',
  templateUrl: './app/prefix/prefix-detail.component.html',
  styleUrls:   ['app/trick-detail.component.css'],
})
export class PrefixDetailComponent implements OnInit, OnDestroy {
  @Input() prefix: Prefix;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;

  constructor(
    private prefixService: PrefixService,
    private route:         ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.prefixService.getPrefix(id)
          .then(prefix => this.prefix = prefix);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.prefixService
        .save(this.prefix)
        .then(prefix => {
          this.prefix = prefix; // saved hero, w/ id if new
          this.goBack(prefix);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  delete(event: any) {
    event.stopPropagation();
    this.prefixService
        .delete(this.prefix)
        .then(res => {
          this.prefix = null
          this.goBack(this.prefix);
        })
        .catch(error => this.error = error);
  }

  goBack(savedPrefix: Prefix = null) {
    this.close.emit(savedPrefix);
    window.history.back();
  }
}

