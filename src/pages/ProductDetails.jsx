import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { useCart } from "../context/CartContext";
import { siWhatsapp } from "simple-icons";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!id || id === "undefined") {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await apiRequest(`/products/${id}`);
        setProduct(data);
        setActiveImage(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500 animate-pulse">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 py-20">
        <div className="text-center px-6">
          <h2 className="text-3xl font-bold font-jakarta text-zinc-900 mb-4">
            Product not found
          </h2>
          <p className="text-lg text-zinc-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find a product with ID "{id}".
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition duration-300 shadow-md"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length > 0 
    ? product.images 
    : [product.image || "/placeholder.jpg"];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2800);
    setQuantity(1);
  };

  return (
    <section className="w-full bg-linear-to-b from-zinc-50 to-white min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-zinc-500 font-poppins">
          <Link to="/" className="hover:text-zinc-800 transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/shop" className="hover:text-zinc-800 transition-colors">Shop</Link>
          <span className="mx-2">›</span>
          <span className="text-zinc-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Image Gallery */}
          <div className="space-y-5 lg:space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-zinc-100 group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300
                      ${activeImage === index 
                        ? "border-[#760815] shadow-sm scale-[1.03]" 
                        : "border-transparent hover:border-zinc-300 hover:shadow-sm"}
                    `}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jakarta text-zinc-900 mb-5 leading-tight">
              {product.name}
            </h1>

            <div className="mb-8">
              <p className="text-4xl sm:text-5xl font-bold text-[#760815] tracking-tight">
                ₹{Number(product.price).toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="mt-1 text-lg text-zinc-500 line-through">
                  ₹{Number(product.originalPrice).toLocaleString()}
                </p>
              )}
            </div>

            <div className="prose prose-zinc max-w-none mb-10">
              <p className="text-zinc-700 leading-relaxed whitespace-pre-line text-lg">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-5">
                <div className="flex border border-zinc-300 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-5 py-3 text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 transition-colors text-xl font-medium"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-6 py-3 text-lg font-semibold text-zinc-900 min-w-12 text-center border-x border-zinc-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-5 py-3 text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 transition-colors text-xl font-medium"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`flex-1 py-4 px-8 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-lg
                    ${addedToCart 
                      ? "bg-green-600 hover:bg-green-700 scale-100" 
                      : "bg-[#760815] hover:bg-[#5f0a12] hover:shadow-xl hover:scale-[1.02] active:scale-100"}
                  `}
                >
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </button>
              </div>

              <a
                href={`https://wa.me/917506986013?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(product.name)}%20—%20can%20you%20help%20me%20with%20this?`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border-2 border-[#25D366] text-[#25D366] rounded-xl py-4 px-6 font-medium text-lg hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d={siWhatsapp.path} />
                </svg>
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;