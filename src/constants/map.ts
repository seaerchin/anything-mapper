import { Map } from '../types'

// TODO: update mapItem manyOf type
const MAP_POINT = {
  id: 0,
  title: 'Punggol Polyclinic',
  subtitle: 'vaccinate me',
  // this turns into an accordion of k: v
  // this is the field that is filtered on
  body: { price: 50, location: 'Punggol', amenities: ['plants'] },
  tags: ['polyclinic', 'accessible'],
  meta: {
    lat: 1.4032283496291196,
    long: 103.91307345396827,
  },
}

const MAP_POINT_TWO = {
  id: 1,
  title: 'Lian Clinic',
  subtitle: 'vaccinate me too',
  body: { price: 30, location: 'Marsiling', amenities: ['air con'] },
  tags: ['private clinic', 'caring'],
  meta: {
    lat: 1.4435207041227593,
    long: 103.77789858380173,
  },
}

const MAP_POINT_THREE = {
  id: 2,
  title: 'Raffles Medical Clinic',
  subtitle: 'vaccinate me three',
  body: { price: 100, location: 'Sengkang', amenities: ['food'] },
  tags: ['expensive'],
  meta: {
    lat: 1.3936355744766076,
    long: 103.89566929206349,
  },
}

const MAP: Map = {
  id: 0,
  points: [MAP_POINT, MAP_POINT_TWO, MAP_POINT_THREE],
  title: 'Vaccination Clinics',
  description: 'Get your jab today',
  // determines what can be filtered (shown in drawer pane)
  defaultFilterValues: {
    price: {
      fieldType: 'range',
      default: [0, 100],
    },
    amenities: {
      fieldType: 'manyOf',
      default: ['air con', 'food', 'plants'],
    },
    location: {
      fieldType: 'oneOf',
      default: ['Punggol', 'Marsiling', 'Sengkang'],
    },
  },
}

export { MAP_POINT }
export default MAP
