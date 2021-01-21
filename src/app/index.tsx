import * as React from 'react'
import './App.css'

import { Card } from '../components/Card'

import { MapPage } from '../pages/Map'

import BASE_MAP_OBJECT from '../constants/mapObject'

function App() {
  return (
    <div className="App">
      {/* eslint-disable react/jsx-props-no-spreading */}
      <Card {...BASE_MAP_OBJECT} />
      <MapPage
        center={{ lat: 50, long: 50 }}
        points={[{ lat: 50, long: 50.1 },
          { lat: 50.1, long: 50 }]}
      />
    </div>
  )
}

export default App
