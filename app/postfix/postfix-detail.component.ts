import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Postfix }        from './postfix';
import { PostfixService } from './postfix.service';

@Component({
  selector:    'postfix-detail',
  templateUrl: './app/postfix/postfix-detail.component.html',
  styleUrls:   ['app/trick/trick-detail.component.css'],
})
export class PostfixDetailComponent implements OnInit, OnDestroy {
  @Input() postfix: Postfix;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;

  constructor(
    private postfixService: PostfixService,
    private route:         ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.postfixService.getPostfix(id)
          .then(postfix => this.postfix = postfix);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.postfixService
        .save(this.postfix)
        .then(postfix => {
          this.postfix = postfix; // saved hero, w/ id if new
          this.goBack(postfix);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  delete(event: any) {
    event.stopPropagation();
    this.postfixService
        .delete(this.postfix)
        .then(res => {
          this.postfix = null
          this.goBack(this.postfix);
        })
        .catch(error => this.error = error);
  }

  goBack(savedPostfix: Postfix = null) {
    this.close.emit(savedPostfix);
    window.history.back();
  }
}

