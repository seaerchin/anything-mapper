import * as React from 'react'
import './App.css'

import { EditPage } from '../pages/EditPage'

import { NavBar } from '../components/NavBar/NavBar'
import { OptionsBar } from '../components/OptionsBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <OptionsBar />
      {/* eslint-disable react/jsx-props-no-spreading */}
      <EditPage />
    </div>
  )
}

export default App
