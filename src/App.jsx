import { useState } from 'react'
import Nav from './components/nav'
import Footer from './components/footer'
import Collection from './components/Collection'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Work from './components/Work'
import Personal from './components/Personal'
import './App.css'
import Grocery from './components/Grocery'
import Signup from './components/signup'
import Signin from './components/signin'
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="*"
            element={
              <>
                <Nav />
                <Routes>
                  <Route path="/Work" element={<Work />} />
                  <Route path="/Personal" element={<Personal />} />
                  <Route path="/Grocery" element={<Grocery />} />
                  <Route path="/" element={<Collection />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
