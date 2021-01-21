import React from 'react'
import ReactMapboxGl, { ZoomControl, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Image } from '@chakra-ui/react'

import token from './constants.json'

type Point = {
    lat: number,
    long: number
}

type MapProps = {
    center: Point
    points: Point[]
}

const makePoint = ({ lat, long }: Point) => (
  <Marker
    coordinates={[long, lat]}
    anchor="bottom"
  >
    <Image
      borderRadius="full"
      boxSize="20px"
      src="https://bit.ly/sage-adebayo"
    />
  </Marker>
)

const MapPage = ({ center, points }: MapProps) => {
  const Map = ReactMapboxGl({ accessToken: token.public })

  return (
    <Map
      style={styles.streetView}
      containerStyle={{
        height: '50vh',
        width: '50vw',
      }}
      // NOTE: long/lat due to react-mapbox-gl requirements
      center={[center.long, center.lat]}
    >
      <ZoomControl />
      <>
        {points.map((point) => makePoint(point))}
      </>
    </Map>
  )
}

const styles = {
  streetView: 'mapbox://styles/mapbox/streets-v8',
}

export { MapPage }
