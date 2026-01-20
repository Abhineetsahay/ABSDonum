import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import collections from "../lib/collections";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full">
      <img
        src={collections[current].image}
        alt={collections[current].title}
        onClick={() => navigate('/collections')}
        className="w-full aspect-video md:h-85 object-cover cursor-pointer"
      />

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        <ChevronRight size={26} />
      </button>
    </section>
  );
};

export default Slider;
