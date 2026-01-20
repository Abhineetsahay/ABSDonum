import React, { useState } from "react";

const WHATSAPP_NUMBER = "917506986013";

const CustomGift = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState(2500);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!phone || !description.trim()) {
      alert("Please provide your WhatsApp number and a description of your idea.");
      return;
    }

    const message = `
Custom Gift Inquiry 🎁

Name: ${name || "—"}
WhatsApp: ${phone}
Occasion: ${occasion || "Not specified"}
Budget: ₹${budget.toLocaleString()}

My vision:
${description.trim()}
    `.trim();

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <section className="min-h-screen bg-[#FAF9F6] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="max-w-2xl mx-auto lg:mx-0">

              <span className="inline-block text-xs md:text-sm tracking-wider font-semibold text-[#8B2E2E] uppercase mb-3">
                Custom Handcrafted Gift
              </span>

              <h1 className="text-4xl sm:text-5xl font-jakarta font-extrabold text-zinc-900 leading-tight mb-5">
                Something Made Just for Them
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 font-poppins mb-10 max-w-xl">
                Share your story, occasion and vision — we’ll bring it to life with care and craftsmanship.
              </p>

              <form className="space-y-6 md:space-y-7">

                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer w-full px-5 py-4 bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder-transparent focus:outline-none focus:border-[#8B2E2E] focus:ring-1 focus:ring-[#8B2E2E]/30 transition"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-5 -top-2.5 px-2 bg-[#FAF9F6] text-sm text-zinc-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#8B2E2E] transition-all pointer-events-none"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} 
                    className="peer w-full px-5 py-4 bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder-transparent focus:outline-none focus:border-[#8B2E2E] focus:ring-1 focus:ring-[#8B2E2E]/30 transition"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-5 -top-2.5 px-2 bg-[#FAF9F6] text-sm text-zinc-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#8B2E2E] transition-all pointer-events-none"
                  >
                    WhatsApp Number *
                  </label>
                </div>

                <div className="relative">
                  <select
                    id="occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="peer w-full px-5 py-4 bg-white border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-[#8B2E2E] focus:ring-1 focus:ring-[#8B2E2E]/30 transition appearance-none"
                  >
                    <option value="" disabled hidden></option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate Gift</option>
                    <option value="Other">Other</option>
                  </select>
                  <label
                    htmlFor="occasion"
                    className="absolute left-5 -top-2.5 px-2 bg-[#FAF9F6] text-sm text-zinc-500 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#8B2E2E] transition-all pointer-events-none"
                  >
                    Occasion
                  </label>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                    ▼
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-zinc-600">Estimated Budget</label>
                    <span className="text-lg font-semibold text-[#8B2E2E]">
                      ₹{budget.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="15000"
                    step="500"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[#8B2E2E]"
                  />
                </div>

                <div className="relative">
                  <textarea
                    id="description"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="peer w-full px-5 py-4 bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder-transparent focus:outline-none focus:border-[#8B2E2E] focus:ring-1 focus:ring-[#8B2E2E]/30 transition resize-none"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="description"
                    className="absolute left-5 top-4 px-2 bg-[#FAF9F6] text-sm text-zinc-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#8B2E2E] transition-all pointer-events-none"
                  >
                    Your Vision / Ideas *
                  </label>
                </div>

                <div className="border-2 border-dashed border-zinc-300 rounded-xl p-6 text-center">
                  <p className="text-sm font-medium text-zinc-600">Inspiration Photo (optional)</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    You can share images during our WhatsApp conversation
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-5 bg-[#8B2E2E] hover:bg-[#742525] text-white rounded-2xl font-jakarta font-bold text-lg shadow-md shadow-[#8B2E2E]/20 hover:shadow-lg hover:shadow-[#8B2E2E]/30 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Send Request on WhatsApp →
                </button>

                <p className="text-xs text-zinc-500 text-center mt-4">
                  You’ll be taken to WhatsApp to continue the conversation securely.
                </p>
              </form>
            </div>
          </div>

          <div className="relative hidden lg:block lg:col-span-5 order-1 lg:order-2 h-[70vh] lg:h-[90vh] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
            <img
              src="/images/custom-gift.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
              <h3 className="text-3xl font-jakarta font-bold mb-3">
                Crafted with Heart
              </h3>
              <p className="text-base font-poppins text-white/90 max-w-sm">
                Every piece is made with intention and care, just the way you imagined. For the people you feel are important for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomGift;