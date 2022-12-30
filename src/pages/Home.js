import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './MainActivity';

function Home() {
  return (
    <div>
     <Router>

        <Routes>
        <Route exact path="/" element={<Main />} />
        </Routes>
     </Router>
    </div>
  )
}

export default Home