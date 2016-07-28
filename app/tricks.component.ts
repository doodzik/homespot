import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';

import { HeroDetailComponent } from './trick-detail.component';
import { Hero }                from './trick';
import { HeroService }         from './trick.service';

@Component({
  selector: 'my-tricks',
  templateUrl: 'app/tricks.component.html',
  styleUrls: ['app/tricks.component.css'],
  directives: [HeroDetailComponent],
})
export class TricksComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;

  constructor(
    private heroService: HeroService,
    private router: Router) { 
  }

  getHeroes() {
    this.heroService
        .getHeroes()
        .then(heroes => this.heroes = heroes)
        .catch(error => this.error = error);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { 
    this.selectedHero = hero; 
  }

  gotoDetail() {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }

}
