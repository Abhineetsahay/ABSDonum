import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
import { useNavigate, Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("/products");
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Featured Products
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Handpicked selections just for you.
          </p>
        </div>
        <Link 
          to="/shop" 
          className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
        >
          View all products &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">

        {loading &&
          [...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg aspect-4/5 w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}

        {!loading &&
          products.map((p) => (
            <div
              key={p._id}
              className="group relative cursor-pointer"
              onClick={() => navigate(`/products/${p._id}`)}
            >
              <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-gray-100 relative">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                
              </div>

              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {p.name}
                  </h3>

                </div>
                <p className="text-sm font-bold text-gray-900 whitespace-nowrap ml-2">
                  {formatPrice(p.price)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;