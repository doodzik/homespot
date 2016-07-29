import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';

import { TrickDetailComponent } from './trick-detail.component';
import { Trick }                from './trick';
import { TrickService }         from './trick.service';

@Component({
  selector: 'my-tricks',
  templateUrl: 'app/trick/tricks.component.html',
  styleUrls: ['app/trick/tricks.component.css'],
  directives: [TrickDetailComponent],
})
export class TricksComponent implements OnInit {

  tricks: Trick[];
  selectedTrick: Trick;
  addingTrick = false;
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

  addTrick() {
    this.addingTrick = true;
    this.selectedTrick = null;
  }

  close(savedTrick: Trick) {
    this.addingTrick = false;
    if (savedTrick) { this.getTricks(); }
  }

  deleteTrick(trick: Trick, event: any) {
    event.stopPropagation();
    this.trickService
        .delete(trick)
        .then(res => {
          this.tricks = this.tricks.filter(h => h !== trick);
          if (this.selectedTrick === trick) { this.selectedTrick = null; }
        })
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getTricks();
  }

  onSelect(trick: Trick) { 
    this.selectedTrick = trick; 
  }

  gotoDetail() {
    let link = ['/trick', this.selectedTrick.id];
    this.router.navigate(link);
  }

}
