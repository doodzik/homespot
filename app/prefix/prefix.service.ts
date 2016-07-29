import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Prefix } from './prefix';

@Injectable()
export class PrefixService {
  private url = 'app/prefixes';  // URL to web api

  constructor(private http: Http) { }

  getPrefixes() {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json().data as Prefix[])
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getPrefix(id: number) {
    return this.getPrefixes()
               .then(prefixes => prefixes.find(prefix => prefix.id === id));
  }
  
  // Add new Hero
  private post(prefix: Prefix): Promise<Prefix> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.url, JSON.stringify(prefix), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Hero
  private put(prefix: Prefix) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${prefix.id}`;

    return this.http
               .put(url, JSON.stringify(prefix), {headers: headers})
               .toPromise()
               .then(() => prefix)
               .catch(this.handleError);
  }

  delete(prefix: Prefix) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${prefix.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  save(prefix: Prefix): Promise<Prefix>  {
    if (prefix.id) {
      return this.put(prefix);
    }
    return this.post(prefix);
  }
}

