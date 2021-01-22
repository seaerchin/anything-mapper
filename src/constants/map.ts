import { Map } from '../types'

const MAP_POINT = {
  id: 0,
  title: 'test',
  subtitle: 'i am a tset location',
  // this turns into an accordion of k: v
  body: { description: 'i am a map', things: 'house' },
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
  body: { why: 'good', stuff: 'bad' },
  tags: ['hello', 'world'],
  meta: {
    lat: 24.6,
    long: 23.4,
  },
}

const MAP_POINT_THREE = {
  id: 2,
  title: 'test3',
  subtitle: 'same',
  body: { what: 'go', stuffed: 'gr8' },
  tags: ['aaa', 'bbb'],
  meta: {
    lat: 24.61,
    long: 23.4,
  },
}

const MAP: Map = {
  id: 0,
  // points: [0, 1], // think this should be our representation but for now stick with below
  points: [MAP_POINT, MAP_POINT_TWO, MAP_POINT_THREE, MAP_POINT, MAP_POINT, MAP_POINT],
  title: 'list of postal boxes',
  description: 'this is a list of all the postal boxes lmao',
  defaultFilterValues: {
    price: {
      fieldType: 'range',
      default: {
        low: 0,
        high: 100,
      },
    },
    location: {
      fieldType: 'manyOf',
      default: ['hello', 'this', 'checkbox'],
    },
    test: {
      fieldType: 'oneOf',
      default: ['pick', 'this', 'checkbox'],
    },
  },
}

export { MAP_POINT }
export default MAP
