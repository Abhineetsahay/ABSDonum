import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import React from "react"
import Hero from "../components/Hero"
import Slider from "../components/Slider"
import FeaturedProducts from "../components/FeaturedProducts"
import About from "../components/About"

const Home = () => {
  const location = useLocation();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    if (location.hash === "#about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);
  return (
    <>
      <Hero ref ={heroRef}/>
      <Slider/>
      <FeaturedProducts/>
      <About ref={aboutRef} />
    </>
  )
}

export default Home
