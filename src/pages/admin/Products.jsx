import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchData = async () => {
    try {
      const [productsData, collectionsData] = await Promise.all([
        apiRequest("/products"),
        apiRequest("/collections"),
      ]);
      setProducts(productsData || []);
      setCollections(collectionsData || []);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (collections.length > 0 && !collectionId) {
      setCollectionId(collections[0]._id);
    }
  }, [collections, collectionId]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("price", price);
      formData.append("description", description.trim());
      formData.append("collection", collectionId);

      images.forEach((img) => {
        formData.append("images", img);
      });

      await apiRequest("/products", {
        method: "POST",
        body: formData,
      });

      setSuccess("Product created successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setCollectionId(collections[0]?._id || "");
      setImages([]);
      setImagePreviews([]);
      await fetchData();
    } catch (err) {
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete product "${name}"? This cannot be undone.`)) return;

    try {
      await apiRequest(`/products/${id}`, { method: "DELETE" });
      setSuccess("Product deleted");
      await fetchData();
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Manage Products</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
          {success}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Add New Product</h2>

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                placeholder="e.g. Batman figurine"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="899.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              placeholder="Short description of the product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection *
            </label>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
            >
              <option value="">Select a collection</option>
              {collections.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images * (multiple allowed)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2.5 file:px-5
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-100 file:text-gray-700
                hover:file:bg-gray-200 transition"
              required={images.length === 0}
            />

            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`
                px-6 py-3 bg-black text-white font-medium rounded-lg
                hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 flex items-center gap-2
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">
          Products ({products.length})
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">No products yet. Create your first one above.</p>
        ) : (
          <div className="space-y-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  {p.images?.[0] && (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <p className="text-sm text-gray-600">₹{Number(p.price).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {collections.find((c) => c._id === p.collection)?.name || "No collection"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(p._id, p.name)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium whitespace-nowrap"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}