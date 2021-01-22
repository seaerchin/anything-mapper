import React, { useMemo } from 'react'

import MapComponent from './components/Map'

import { MapProps } from '../../types'

const Map = ({ points }: MapProps) => {
  const memoizedMap = useMemo(() => (
    <MapComponent points={points} />
  ), [points])
  return memoizedMap
}

const MapPage = ({ points }: MapProps) => <Map points={points || []} />

export { MapPage }
