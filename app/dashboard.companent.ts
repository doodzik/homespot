import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TrickService } from './trick/trick.service';
import { Trick }        from './trick/trick';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  tricks: Trick[] = [];

  constructor(
    private trickService: TrickService,
    private router: Router) {
  }

  ngOnInit() {
    this.trickService.getTricks()
      .then(tricks => this.tricks = tricks.slice(1, 5));
  }

  gotoDetail(trick: Trick) {
    let link = ['/trick', trick.id];
    this.router.navigate(link);
  }
}
