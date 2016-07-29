import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Postfix }        from './postfix';
import { PostfixService } from './postfix.service';

@Component({
  selector:    'postfix-new',
  templateUrl: 'app/postfix/postfix-new.component.html',
  styleUrls:   ['app/trick/trick-detail.component.css'],
})
export class PostfixNewComponent implements OnInit {

  postfix: Postfix;
  error: any;

  constructor(
    private postfixService: PostfixService,
    private route:         ActivatedRoute) {
  }

  ngOnInit() {
    this.postfix = new Postfix();
  }

  goBack() {
    window.history.back();
  }

  save() {
    this.postfixService
        .save(this.postfix)
        .then(postfix => {
          this.postfix = postfix; // saved hero, w/ id if new
          this.goBack();
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
}


