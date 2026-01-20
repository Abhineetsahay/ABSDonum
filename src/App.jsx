import React from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer'

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const App = () => {
   const location = useLocation();
  const contactRef = useRef(null);

  useEffect(() => {
      if (location.hash === "#contact") {
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, [location]);
  return (
    <div>
      <Navbar />
      <AppRoutes/>
      <Footer ref={contactRef}/>
    </div>
  )
}

export default App
