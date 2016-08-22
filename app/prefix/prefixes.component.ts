import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';

import { Prefix }                from './prefix';
import { PrefixService }         from './prefix.service';

@Component({
  selector:    'my-prefixes',
  templateUrl: 'app/prefix/prefixes.component.html',
  styleUrls:   ['app/prefix/prefixes.component.css'],
})
export class PrefixesComponent implements OnInit {

  prefixes: Prefix[];
  error: any;

  constructor(
    private prefixService: PrefixService,
    private router: Router) { 
  }

  ngOnInit() {
    this.getPrefixes();
  }

  getPrefixes() {
    this.prefixService
        .getPrefixes()
        .then(prefixes => this.prefixes = prefixes)
        .catch(error => this.error = error);
  }

  new() {
    let link = ['/prefix/new'];
    this.router.navigate(link);
  }

  show(prefix: Prefix) {
    let link = ['/prefix', prefix.id];
    this.router.navigate(link);
  }
}
