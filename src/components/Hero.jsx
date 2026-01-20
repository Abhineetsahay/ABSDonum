import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-[68px] tracking-[0.06em] md:text-5xl font-poppins font-bold leading-tight text-black">
              Gifts that feel{" "}
              <br /><span className="pt-5 text-[#760815]">personal</span>
            </h1>

            <p className="mt-6 text-base md:text-lg font-poppins text-zinc-600 max-w-md">
              Premium creative gifts made just for them. Create unforgettable
              moments with our curated and custom collections.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="px-6 py-3 bg-[#760815] text-white font-poppins font-medium rounded-md hover:opacity-90 transition"
              >
                Shop now
              </Link>

              <Link
                to="/custom-gift"
                className="px-6 py-3 border border-zinc-300 text-zinc-700 font-poppins font-medium rounded-md hover:border-zinc-400 transition"
              >
                Create Custom Gifts
              </Link>
            </div>
          </div>

          <div className="flex mr-6 justify-center md:justify-end">
            <img
              src="/images/hero-image.png"
              alt="Personalized gifts"
              className="w-full max-w-md rounded-2xl shadow-lg object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Home
