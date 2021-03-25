import './app.css'
import React from 'react';

import Routes from "./routes"
import Header from "./components/Header"
 
function App() {
  return (
    <div className="boxMain">
      <Header />
      <Routes />
      
    </div>
  )
}

export default App;