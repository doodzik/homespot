import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Postfix } from './postfix';

@Injectable()
export class PostfixService {
  private url = 'app/postfixes';  // URL to web api

  constructor(private http: Http) { }

  getPostfixes() {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json().data as Postfix[])
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getPostfix(id: number) {
    return this.getPostfixes()
               .then(postfixes => postfixes.find(postfix => postfix.id === id));
  }
  
  // Add new Hero
  private post(postfix: Postfix): Promise<Postfix> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.url, JSON.stringify(postfix), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Hero
  private put(postfix: Postfix) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${postfix.id}`;

    return this.http
               .put(url, JSON.stringify(postfix), {headers: headers})
               .toPromise()
               .then(() => postfix)
               .catch(this.handleError);
  }

  delete(postfix: Postfix) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${postfix.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  save(postfix: Postfix): Promise<Postfix>  {
    if (postfix.id) {
      return this.put(postfix);
    }
    return this.post(postfix);
  }
}

