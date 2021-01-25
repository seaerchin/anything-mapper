import * as React from 'react'
import './App.css'

import { EditPage } from '../pages/EditPage'

import { NavBar } from '../components/NavBar/NavBar'
import { OptionsBar } from '../components/OptionsBar'
import { MapStateProvider } from '../contexts /MapContext'

function App() {
  return (
    <MapStateProvider>
      <div className="App">
        <NavBar />
        <OptionsBar />
        {/* eslint-disable react/jsx-props-no-spreading */}
        <EditPage />
      </div>
    </MapStateProvider>
  )
}

export default App
