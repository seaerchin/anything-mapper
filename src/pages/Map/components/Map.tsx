import React from 'react'
import ReactMapboxGl, { ZoomControl, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Image } from '@chakra-ui/react'

import { MapProps, Point } from '../../../types'

import token from '../constants.json'

// TODO: implement this
const calculateCenter = (points: Point[]) => points[0] || { lat: 50, long: 50 }

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

// TODO: fix visual bug where initial render not full
const MapComponent = ({ points }: MapProps) => {
  const Map = ReactMapboxGl({ accessToken: token.public })
  const center = calculateCenter(points)
  return (
    <Map
      style={styles.streetView}
      containerStyle={{
        height: '100%',
        width: '100%',
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

export default MapComponent
