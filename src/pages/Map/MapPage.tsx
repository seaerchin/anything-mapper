import React from 'react'

import Map from './components/Map'

import { MapProps } from '../../types'

const MapPage = ({ points }: Partial<MapProps>) => (
  <Map points={points || []} />
)

export { MapPage }
