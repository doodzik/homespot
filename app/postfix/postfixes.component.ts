import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';

import { Postfix }                from './postfix';
import { PostfixService }         from './postfix.service';

@Component({
  selector:    'my-postfixes',
  templateUrl: 'app/postfix/postfixes.component.html',
  styleUrls:   ['app/postfix/postfixes.component.css'],
})
export class PostfixesComponent implements OnInit {

  postfixes: Postfix[];
  error: any;

  constructor(
    private postfixService: PostfixService,
    private router: Router) { 
  }

  ngOnInit() {
    this.getPostfixes();
  }

  getPostfixes() {
    this.postfixService
        .getPostfixes()
        .then(heroes => this.postfixes = heroes)
        .catch(error => this.error = error);
  }

  new() {
    let link = ['/postfix/new'];
    this.router.navigate(link);
  }

  show(postfix: Postfix) {
    let link = ['/postfix', postfix.id];
    this.router.navigate(link);
  }
}
