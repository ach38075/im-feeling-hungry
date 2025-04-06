import { useState } from 'react'
import './index.css'
import './App.css'
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/home'
import { Signup } from './pages/signup'
import{ Login } from './pages/login'
import { SavedRecipes } from './pages/SavedRecipes'
import { Layout } from './layout'
import { RefreshProvider } from './context/RefreshContext';

function App() {
  return (
    <>  
      <RefreshProvider>
        <Router>
          <Routes>
            <Route element = {<Layout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/savedRecipes" element={<SavedRecipes/>}/>
            </Route>
          </Routes>
        </Router>
      </RefreshProvider>
    </>
  )

}

export default App;