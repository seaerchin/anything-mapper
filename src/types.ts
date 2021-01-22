type MapItem = {
    title: string
    subtitle: string
    imageURL?: string
    body: Dictionary<string>
    tags?: string[]
    meta: {
      lat: number,
      long: number
    }
  }

type Dictionary<T> = {
  [key: string]: T
}

type Point = {
    lat: number,
    long: number
}

type MapProps = {
    points: Point[]
}

type filterMappings = {fieldType: 'oneOf', default: string[]} | {fieldType: 'manyOf', default: string[]} | {fieldType: 'range', default:{low: number, high: number}}

type Map = {
  defaultFilterValues: Dictionary<filterMappings>
  id: number
  points: MapItem[]
  title: string
  description: string
}

// This breaks convention because we want to
// extend this later, which we are unable
// to do with types.
interface Action {
 type: string
}

export type {
  Action, MapItem, MapProps, Point, Dictionary, Map, filterMappings,
}
