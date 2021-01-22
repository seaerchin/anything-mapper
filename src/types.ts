type MapItem = {
    title: string
    subtitle: string
    imageURL?: string
    body: string[]
    tags?: string[]
    meta: {
      lat: number,
      long: number
    }
  }

type Point = {
    lat: number,
    long: number
}

type MapProps = {
    points: Point[]
}

export type { MapItem, MapProps, Point }
