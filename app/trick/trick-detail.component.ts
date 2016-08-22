import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Trick }          from './trick';
import { TrickService }   from './trick.service';
import { Prefix }         from '../prefix/prefix';
import { PrefixService }  from '../prefix/prefix.service';
import { Postfix }        from '../postfix/postfix';
import { PostfixService } from '../postfix/postfix.service';

import * as _ from 'lodash'

@Component({
  selector:    'my-trick-detail',
  templateUrl: 'app/trick/trick-detail.component.html',
  styleUrls:   ['app/trick/trick-detail.component.css'],
})
export class TrickDetailComponent implements OnInit, OnDestroy {
  @Input() trick: any;
  trickOld: any;
  @Output() close = new EventEmitter();

  prefixes: any;
  postfixes: any;

  error: any;
  sub: any;

  constructor(
    private trickService: TrickService,
    private prefixService: PrefixService,
    private postfixService: PostfixService,
    private route:       ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.trickService.find(id)
          .then(trick => this.trick = trick)
          .then(trick => this.trickOld = _.cloneDeep(trick))
          // .then(x => alert(JSON.stringify(x)))
          .then(x => {
            this.getPrefixes()
            this.getPostfixes()
          })
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedTrick: Trick = null) {
    this.close.emit(savedTrick);
    window.history.back()
  }

  save() {
    // alert(JSON.stringify(this.trick))

    let convertStance = x => {
      var bar = []
      if(x.normal)
        bar.push(0)
      if(x.nollie)
        bar.push(1)
      if(x.switch)
        bar.push(2)
      if(x.fakie)
        bar.push(3)
      return bar
    }

    let stances = convertStance(this.trick.stance)

    let stanceRemoved = _.difference(convertStance(this.trickOld.stance), stances)
    
    let prefixesSelected = this.prefixes.filter(p => p.selected)
                                          .reduce((a, b) => { 
                                              a.push(b.id)
                                              return a
                                          }, [])
    let prefixRemoved = _.difference(Array.from(this.trickOld.prefixes), prefixesSelected)

    let postfixesSelected = this.postfixes.filter(p => p.selected)
                                          .reduce((a, b) => { 
                                              a.push(b.id)
                                              return a
                                          }, [])
    let postfixesRemoved = _.difference(Array.from(this.trickOld.postfixes), postfixesSelected)

    
    
    this.trickService
        .deleteWith(stanceRemoved, prefixRemoved, postfixesRemoved)
        .save(this.trick)
        .then(trick => {
          this.trick = trick; // saved trick, w/ id if new
          this.goBack(trick);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  delete(event: any) {
    event.stopPropagation();
    this.trickService
        .delete(this.trick)
        .then(res => {
          this.trick = null; // saved trick, w/ id if new
          this.goBack();
        })
        .catch(error => this.error = error);
  }

  getPrefixes() {
    this.prefixService
        .getPrefixes()
        .then(prefixes => this.prefixes = prefixes)
        .then(prefixes => this.prefixes.forEach(x => x["selected"] = this.trick.prefixes.has(x.id)))
        .catch(error => this.error = error);
  } 
  
  getPostfixes() {
    this.postfixService
        .getPostfixes()
        .then(postfixes => this.postfixes = postfixes)
        .then(postfixes => this.postfixes.forEach(x => x["selected"] = this.trick.postfixes.has(x.id)))

        .catch(error => this.error = error);
  }

}
