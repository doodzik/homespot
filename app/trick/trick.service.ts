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

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getTrick(id: number) {
    return this.getTricks()
               .then(tricks => tricks.find(trick => trick.id === id));
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

  save(trick: Trick): Promise<Trick>  {
    if (trick.id) {
      return this.put(trick);
    }
    return this.post(trick);
  }
}
