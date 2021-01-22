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

export type { MapItem, MapProps, Point }
