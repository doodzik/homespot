import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Trick } from './trick';

@Injectable()
export class TrickService {
  private url = 'app/tricks';  // URL to web api

  constructor(private http: Http) { }

  getTricks() {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json().data as Trick[])
               .catch(this.handleError);
  }
  
  getTrickNames() {
      return this
        .getTricks()

        .then(tricks => {
          return tricks.reduce((a, b) => { 
            return a.add(b.name) 
          }, new Set())
        })
        .then(tricks =>  Array.from(tricks) )
        .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getTrick(id: String) {
    return this.getTricks()
               .then(tricks => tricks.find(trick => trick.name === id));
  }

  find(id: String) {
    return this.getTricks()
               .then(tricks => tricks.filter(trick => trick.name === id))
               .then(tricks => {
                 return tricks.reduce((a, b) => { 
                   a.stance.add(b.stance)
                   a.prefixes.add(b.prefix_id)
                   a.postfixes.add(b.postfix_id)
                   return a
                 }, { name: tricks[0].name, stance: new Set(), prefixes: new Set(), postfixes: new Set()})
               })
              .then(trick => {
                return {
                  stance: {
                    normal: trick.stance.has(0),
                    nollie: trick.stance.has(1),
                    switch: trick.stance.has(2),
                    fakie:  trick.stance.has(3),
                  },
                  name: trick.name,
                  prefixes: trick.prefixes,
                  postfixes: trick.postfixes
                }
              })
  }
  
  // Add new Trick
  private post(trick: Trick): Promise<Trick> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.url, JSON.stringify(trick), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Trick
  private put(trick: Trick) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${trick.id}`;

    return this.http
               .put(url, JSON.stringify(trick), {headers: headers})
               .toPromise()
               .then(() => trick)
               .catch(this.handleError);
  }

  delete(trick: Trick) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${trick.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  deleteWith(name: any, stances: any, prefixes: any, postfixes: any) {
      return this
        .getTricks()
        .then(tricks => {
          return tricks.filter(t => {
            return t.prefix_id === name ||
            prefixes.indexOf(t.prefix_id) != -1 ||
            stance.indexOf(t.stance) != -1 ||
            postfixes.indexOf(t.postfix_id)!= -1 
          })
        })
        .then(tricks => tricks.map(this.delete))
  }

  save(trick: Trick): Promise<Trick>  {
    this
    if (trick.id) {
      return this.put(trick);
    }
    return this.post(trick);
  }

}
