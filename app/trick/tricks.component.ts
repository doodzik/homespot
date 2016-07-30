import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';

import { Trick }                from './trick';
import { TrickService }         from './trick.service';

@Component({
  selector: 'my-tricks',
  templateUrl: 'app/trick/tricks.component.html',
  styleUrls: ['app/trick/tricks.component.css'],
})
export class TricksComponent implements OnInit {

  tricks: Trick[];
  error: any;

  constructor(
    private trickService: TrickService,
    private router: Router) { 
  }

  getTricks() {
    this.trickService
        .getTricks()
        .then(tricks => this.tricks = tricks)
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getTricks();
  }

  show(trick: Trick) { 
    let link = ['/trick', trick.id];
    this.router.navigate(link);
  }
}
