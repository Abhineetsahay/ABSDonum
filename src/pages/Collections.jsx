import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await apiRequest("/collections");
        setCollections(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-400 text-lg font-medium animate-pulse">
          Loading collections...
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full bg-[#FAF9F6] pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 md:pt-24 pb-16 md:pb-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-jakarta tracking-tight text-zinc-900">
          Collections
        </h1>
        <p className="mt-5 md:mt-6 text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Thoughtfully curated collections, handcrafted to celebrate every story
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {collections.map((collection) => (
            <CollectionCard
              key={collection._id}
              collection={collection}
              onClick={() => navigate(`/shop?collection=${collection.slug}`)}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-28 text-center px-5">
        <p className="text-zinc-600 text-lg md:text-xl mb-6 md:mb-8">
          Looking for something truly one-of-a-kind?
        </p>
        <Link
          to="/custom-gift"
          className="inline-flex items-center justify-center gap-3 px-10 py-5 
                     bg-zinc-900 text-white text-lg font-semibold 
                     rounded-full shadow-md hover:bg-zinc-800 
                     transition-all duration-300 hover:shadow-xl 
                     active:scale-98 transform"
        >
          Create Your Custom Gift
        </Link>
      </div>
    </section>
  );
};

const CollectionCard = ({ collection, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md 
                 hover:shadow-2xl transition-all duration-500 cursor-pointer
                 hover:-translate-y-2 active:scale-[0.98]"
    >
      <div className="relative aspect-4/5 sm:aspect-5/4 lg:aspect-3/4 overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <h3 className="text-2xl md:text-2.5xl font-bold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            {collection.name}
          </h3>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/15 pointer-events-none transition-all duration-500" />
    </div>
  );
};

export default Collections;