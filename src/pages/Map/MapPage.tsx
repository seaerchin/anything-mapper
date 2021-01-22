import React, { useMemo } from 'react'

import MapComponent from './components/Map'

import { MapProps } from '../../types'

// const LocationItem = ({ location, onSelectLocation, isChecked }) => {
//   const memoisedLocationItem = useMemo(() => (
//     <TouchableOpacity
//       onPress={() => onSelectLocation(location)}
//       hitSlop={Metrics.hitSlop}
//       style={styles.checkBoxContainer}
//     >
//       <CheckBox isChecked={isChecked} style={styles.checkBox} />
//       <Text style={styles.checkBoxText}>
//         {shortenLocationName(location.name)}
//       </Text>
//     </TouchableOpacity>
//   ), [isChecked, location, onSelectLocation])
//   return memoisedLocationItem
// }

const Map = ({ points }: MapProps) => {
  const memoizedMap = useMemo(() => (
    <MapComponent points={points} />
  ), [points])
  return memoizedMap
}

const MapPage = ({ points }: Partial<MapProps>) => <Map points={points || []} />

export { MapPage }
