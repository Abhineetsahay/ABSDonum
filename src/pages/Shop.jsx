import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const navigate = useNavigate();

  const activeCollection = searchParams.get("collection") || "all";

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await apiRequest("/collections");
        setCollections(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let endpoint = "/products";
        const params = new URLSearchParams();

        if (activeCollection !== "all") {
          params.append("collection", activeCollection);
        }

        if (searchQuery) {
          params.append("search", searchQuery);
        }

        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const data = await apiRequest(endpoint);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCollection, searchQuery]);

  return (
    <section className="w-full bg-linear-to-b from-zinc-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jakarta tracking-tight text-zinc-900 mb-5 leading-tight">
            Thoughtful Gifts, Made Personal
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 font-poppins max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked collection of unique, customizable gifts
            that turn moments into memories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-8 border-b border-zinc-200/70">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <button
            onClick={() => navigate("/shop")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${
                activeCollection === "all"
                  ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/10 scale-105"
                  : "bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400 hover:shadow-sm"
              }
            `}
          >
            All Gifts
          </button>

          {collections.map((c) => (
            <button
              key={c._id}
              onClick={() => navigate(`/shop?collection=${c.slug}`)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeCollection === c.slug
                    ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/10 scale-105"
                    : "bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400 hover:shadow-sm"
                }
              `}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">
        {loading ? (
          <div className="text-center py-24 text-zinc-500 animate-pulse">
            Loading thoughtful gifts…
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl sm:text-2xl text-zinc-600 font-medium">
              No products found in this collection.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-6 inline-block px-6 py-3 bg-zinc-900 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition duration-300 shadow-md hover:shadow-lg"
            >
              View All Gifts
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-7 lg:gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-xl overflow-hidden"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
