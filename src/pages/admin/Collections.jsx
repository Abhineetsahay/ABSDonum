import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";

export default function AdminCollections() {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchCollections = async () => {
    try {
      const data = await apiRequest("/collections");
      setCollections(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load collections");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("slug", slug.trim().toLowerCase().replace(/\s+/g, "-"));
      if (image) formData.append("image", image);

      await apiRequest("/collections", {
        method: "POST",
        body: formData,
      });

      setSuccess("Collection created successfully!");
      setName("");
      setSlug("");
      setImage(null);
      setImagePreview(null);
      await fetchCollections();
    } catch (err) {
      setError(err.message || "Failed to create collection");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete collection "${name}"? This cannot be undone.`)) return;

    try {
      await apiRequest(`/collections/${id}`, { method: "DELETE" });
      setSuccess("Collection deleted");
      await fetchCollections();
    } catch (err) {
      setError("Failed to delete collection");
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (!slug || slug === name.toLowerCase().replace(/\s+/g, "-")) {
      setSlug(newName.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Manage Collections</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-semibold mb-5">Create New Collection</h2>

        <form onSubmit={handleCreate} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection Name *
              </label>
              <input
                placeholder="ex-stranger things collection"
                value={name}
                onChange={handleNameChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                collection-route *
              </label>
              <input
                placeholder="ex-stranger-things"
                value={slug}
                onChange={(e) => setSlug(e.target.value.trim().toLowerCase().replace(/\s+/g, "-"))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Image *
            </label>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2.5 file:px-5
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200 transition"
                  required={!imagePreview}
                />
              </div>

              {imagePreview && (
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className={`
                px-6 py-3 cursor-pointer bg-[#751024] text-white font-medium rounded-lg
                hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Collection"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-5">
          Existing Collections ({collections.length})
        </h2>

        {collections.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">No collections yet.</p>
        ) : (
          <div className="space-y-3">
            {collections.map((c) => (
              <div
                key={c._id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  {c.image && (
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-gray-500 font-mono">/{c.slug}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(c._id, c.name)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
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