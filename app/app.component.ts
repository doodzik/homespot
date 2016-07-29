import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { TrickService }       from './trick/trick.service';
import { PrefixService }     from './prefix/prefix.service';
import { PostfixService }    from './postfix/postfix.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
      <a [routerLink]="['/tricks']" routerLinkActive="active">tricks</a>
      <a [routerLink]="['/prefixes']" routerLinkActive="active">Prefixes</a>
      <a [routerLink]="['/postfixes']" routerLinkActive="active">Posfixes</a>
      <router-outlet></router-outlet>
    </nav>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    TrickService,
    PrefixService,
    PostfixService,
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
