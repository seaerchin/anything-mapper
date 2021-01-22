const MAP_POINT = {
  id: 0,
  title: 'test',
  subtitle: 'i am a tset location',
  // we can allow body to be an object with arbitrary keys
  // and later, filtering on those for extension
  // but for now only allow title + tags
  body: ['i love maps', 'but especially anythingmapper'],
  tags: ['test', 'location', 'restaurant'],
  meta: {
    lat: 24.63,
    long: 23.3,
  },
}

const MAP_POINT_TWO = {
  id: 1,
  title: 'test2',
  subtitle: 'different',
  // we can allow body to be an object with arbitrary keys
  // and later, filtering on those for extension
  // but for now only allow title + tags
  body: ['i love maps', 'but especially anythingmapper'],
  tags: ['hello', 'world'],
  meta: {
    lat: 24.6,
    long: 23.4,
  },
}

const MAP = {
  id: 0,
  // points: [0, 1], // think this should be our representation but for now stick with below
  points: [MAP_POINT, MAP_POINT_TWO],
  title: 'list of postal boxes',
  description: 'this is a list of all the postal boxes lmao',
}

export { MAP_POINT }
export default MAP
