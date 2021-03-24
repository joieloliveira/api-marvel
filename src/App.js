import './app.css'
import React from 'react';

import Routes from "./routes"
import Header from "./components/Header"
import Footer from "./components/Footer"
 
function App() {
  return (
    <div className="boxMain">
      <Header />
      <Routes />
      <Footer />
    </div>
  )
}

export default App;