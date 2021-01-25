import { Map } from '../types'

// TODO: update mapItem manyOf type
const MAP_POINT = {
  id: 0,
  title: 'test',
  subtitle: 'i am a tset location',
  // this turns into an accordion of k: v
  // this is the field that is filtered on
  body: { price: 50, location: 'east coast', amenities: ['plants'] },
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
  body: { price: 30, location: 'orchard', amenities: ['bbq'] },
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
  body: { price: 100, location: 'singapore' },
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
  // determines what can be filtered (shown in drawer pane)
  defaultFilterValues: {
    price: {
      fieldType: 'range',
      default: [0, 100],
    },
    amenities: {
      fieldType: 'manyOf',
      default: ['pool', 'bbq', 'plants'],
    },
    location: {
      fieldType: 'oneOf',
      default: ['singapore', 'orchard', 'east coast'],
    },
  },
}

export { MAP_POINT }
export default MAP
