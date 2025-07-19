import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Video from './pages/Video/Video'

function App() {
  const [sidebar, setSidebar] = useState(true)
  return (
    
    <>
      <Navbar setSidebar={setSidebar}/>      {/* passing props */}
      {/* routing */}
      <Routes>
        <Route path = '/' element={<Home sidebar={sidebar}/>}/>
        <Route path = '/video/:categoryId/:videoId' element={<Video/>}/> 
        {/* here :categoryId and :videoId are route parameters (dynamic parts of the URL). */}

      </Routes>
    </>
  )
}

export default App
