export enum STANCE {
  normal,
  switch,
  fakie,
  nolli
}

export class InMemoryDataService {
  createDb() {
    let tricks = [
      {id: 11, name: 'olli', created: Date.now(), stance: STANCE.normal, prefix_id: 1, postfix_id: 1},
      {id: 11, name: 'olli', created: Date.now(), stance: STANCE.normal, prefix_id: 1, postfix_id: 2},
      {id: 11, name: 'olli', created: Date.now(), stance: STANCE.switch, prefix_id: 1, postfix_id: 1},
      {id: 11, name: 'olli', created: Date.now(), stance: STANCE.switch, prefix_id: 1, postfix_id: 2},
      {id: 11, name: '5050', created: Date.now(), stance: STANCE.normal, prefix_id: 1, postfix_id: 2},
      {id: 11, name: '5050', created: Date.now(), stance: STANCE.switch, prefix_id: 1, postfix_id: 2}
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
