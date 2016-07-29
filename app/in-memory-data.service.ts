export class InMemoryDataService {
  createDb() {
    let tricks = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
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
