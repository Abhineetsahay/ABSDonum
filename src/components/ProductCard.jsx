import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out overflow-hidden border border-zinc-100 hover:border-zinc-200"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-zinc-50">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4 pt-5">
        <h3 className="font-jakarta font-semibold text-base sm:text-lg text-zinc-900 line-clamp-2 min-h-10">
          {product.name}
        </h3>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-poppins font-bold text-lg sm:text-xl text-zinc-900">
            ₹{Number(product.price).toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;