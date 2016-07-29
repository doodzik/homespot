import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Obstacle } from './obstacle';

@Injectable()
export class ObstacleService {
  private url = 'app/obstacles';  // URL to web api

  constructor(private http: Http) { }

  getObstacles() {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json().data as Obstacle[])
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getObstacle(id: number) {
    return this.getObstacles()
               .then(obstacles => obstacles.find(obstacle => obstacle.id === id));
  }
  
  // Add new Hero
  private post(obstacle: Obstacle): Promise<Obstacle> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.url, JSON.stringify(obstacle), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Hero
  private put(obstacle: Obstacle) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${obstacle.id}`;

    return this.http
               .put(url, JSON.stringify(obstacle), {headers: headers})
               .toPromise()
               .then(() => obstacle)
               .catch(this.handleError);
  }

  delete(obstacle: Obstacle) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${obstacle.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  save(obstacle: Obstacle): Promise<Obstacle>  {
    if (obstacle.id) {
      return this.put(obstacle);
    }
    return this.post(obstacle);
  }
}

