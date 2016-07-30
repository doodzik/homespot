export class InMemoryDataService {
  createDb() {
    let tricks = [
      {id: 11, name: 'Mr. Nice', created: Date.now()},
      {id: 12, name: 'Narco', created: Date.now()},
      {id: 13, name: 'Bombasto', created: Date.now()},
      {id: 14, name: 'Celeritas', created: Date.now()},
      {id: 15, name: 'Magneta', created: Date.now()},
      {id: 16, name: 'RubberMan', created: Date.now()},
      {id: 17, name: 'Dynama', created: Date.now()},
      {id: 18, name: 'Dr IQ', created: Date.now()},
      {id: 19, name: 'Magma', created: Date.now()},
      {id: 20, name: 'Tornado', created: Date.now()}
    ];

    let prefixes = [
      {id: 1, name: 'fs 180'},
      {id: 2, name: 'fs'},
      {id: 3, name: 'bs 180'},
      {id: 4, name: 'bs'},
    ]
    
    let postfixes = [
      {id: 1, name: 'fs 180'},
      {id: 2, name: 'fs'},
      {id: 3, name: 'bs 180'},
      {id: 4, name: 'bs'},
    ]

    let obstacles = [
      {id: 1, name: 'fs 180'},
      {id: 2, name: 'fs'},
      {id: 3, name: 'bs 180'},
      {id: 4, name: 'bs'},
    ]

    return {tricks, prefixes, postfixes, obstacles};
  }
}
