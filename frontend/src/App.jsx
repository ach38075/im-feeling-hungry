import { useState } from 'react'
import './index.css'
import './App.css'
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/home'
import { Signup } from './pages/signup'
import{ Login } from './pages/login'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )

}

export default App;