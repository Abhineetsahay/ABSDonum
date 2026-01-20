import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const hasItems = cartItems.length > 0;

  return (
    <section className="w-full bg-linear-to-b from-[#FAF9F6] to-white min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-12">
          <h1 className="text-4xl sm:text-5xl font-jakarta font-bold text-zinc-900 tracking-tight">
            Your Selection
          </h1>
          <p className="mt-3 text-lg text-zinc-600 font-poppins">
            Review your thoughtful gifts before we personalize and ship.
          </p>
        </div>

        {!hasItems ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-zinc-100">
            <h2 className="text-2xl font-jakarta font-semibold text-zinc-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-zinc-600 mb-8 max-w-md mx-auto">
              Discover our collection of handcrafted, personal gifts.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition duration-300 shadow-md hover:shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-12 items-start">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex flex-col sm:flex-row gap-6 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="h-40 w-40 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100">
                    <img
                      src={item.images?.[0] || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-jakarta font-semibold text-xl text-zinc-900 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-zinc-500 font-poppins">
                          Premium Handcrafted
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id || item._id)}
                        className="text-zinc-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-wrap justify-between items-end gap-4 mt-6">
                      <p className="font-jakarta font-bold text-2xl text-[#8B2E2E] tracking-tight">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>

                      <div className="flex items-center bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden">
                        <button
                          onClick={() => decreaseQty(item.id || item._id)}
                          disabled={item.quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-medium text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id || item._id)}
                          className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Sticky on desktop */}
            <div className="w-full lg:w-96 lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl p-7 lg:p-8 shadow-sm border border-zinc-100">
                <h3 className="text-2xl font-jakarta font-bold text-zinc-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-5 text-base font-poppins text-zinc-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                    <span className="font-semibold text-zinc-900">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping & Handling</span>
                    <span className="text-zinc-400 italic">Finalized in chat</span>
                  </div>

                  <div className="border-t border-zinc-100 pt-5 mt-3 flex justify-between items-center">
                    <span className="font-bold text-zinc-900 text-lg">
                      Estimated Total
                    </span>
                    <span className="font-bold text-3xl text-[#8B2E2E]">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/917506986013?text=Hi!%20I'd%20like%20to%20place%20an%20order:%0A%0A${cartItems
                    .map(
                      (item) =>
                        `• ${item.name} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
                    )
                    .join("%0A")}%0A%0ATotal: ₹${totalAmount.toLocaleString()}%0A%0APlease%20help%20me%20with%20personalization%20and%20shipping.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white font-semibold text-lg shadow-lg shadow-green-100/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Proceed via WhatsApp
                </a>

                <div className="mt-6 bg-red-50/60 rounded-xl p-5 flex gap-4 items-start border border-red-100/70">
                  <div className="mt-1 bg-[#8B2E2E] text-white rounded-full p-1.5 shrink-0">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    No upfront payment needed. We'll confirm personalization, engraving details, and shipping directly in WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;