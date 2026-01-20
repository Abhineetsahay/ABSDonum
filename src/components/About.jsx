import React from "react";
import { Gem, SlidersHorizontal, Fingerprint } from "lucide-react";
import { forwardRef } from "react";


const WhyDonum = forwardRef(function About(props,ref){
  return (
    <div>
      <section ref={ref} id="about" className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl tracking-tight font-jakarta font-bold text-black mb-6">
            Why Donum?
          </h2>

          <p className="max-w-2xl mx-auto text-lg font-poppins text-zinc-600 mb-8 leading-relaxed">
            Donum is a personalized gifting brand that customizes your gifts to
            add deep meaning, ensuring that the recipient never forgets the gift
            — or how much they mean to you.
          </p>

          <p className="m-10 text-[26px] font-semibold tracking-widest text-zinc-900">
            OUR MOTTO — YOU DREAM IT, WE’LL MAKE IT
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl p-8 hover:shadow-lg flex flex-col items-center text-center transition-all">
              <div className="w-14 h-14 rounded-full bg-[#f6eaea] flex items-center justify-center mb-6">
                <Gem className="text-[#760815]" size={26} />
              </div>

              <h3 className="text-xl font-jakarta font-semibold text-black mb-3">
                Premium Quality
              </h3>

              <p className="text-sm font-poppins text-zinc-600 leading-relaxed">
                Made with the finest materials for a lasting impression and
                durability.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 hover:shadow-lg flex flex-col items-center text-center transition-all">
              <div className="w-14 h-14 rounded-full bg-[#f6eaea] flex items-center justify-center mb-6">
                <SlidersHorizontal className="text-[#760815]" size={26} />
              </div>

              <h3 className="text-xl font-jakarta font-semibold text-black mb-3">
                Customizability
              </h3>

              <p className="text-sm font-poppins text-zinc-600 leading-relaxed">
                Customize the products the way you want them to be.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 hover:shadow-lg flex flex-col items-center text-center transition-all">
              <div className="w-14 h-14 rounded-full bg-[#f6eaea] flex items-center justify-center mb-6">
                <Fingerprint className="text-[#760815]" size={26} />
              </div>

              <h3 className="text-xl font-jakarta font-semibold text-black mb-3">
                Truly Unique
              </h3>

              <p className="text-sm font-poppins text-zinc-600 leading-relaxed">
                Gifts that are truly yours, that you won’t find anywhere else.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default WhyDonum;
