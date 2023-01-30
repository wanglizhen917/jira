import React from 'react'
import './App.css'
import { ProjectListScreen } from 'screens/project-list'
import { TsReactTest } from 'screens/project-list/test'
import { Login } from 'screens/login'

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
      <Login />
    </div>
  )
}

export default App
