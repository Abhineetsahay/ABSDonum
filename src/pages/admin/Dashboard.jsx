import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Package, Layers, LayoutDashboard } from "lucide-react"; // ← add lucide-react (or heroicons/react)

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    try {
      await logout();
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuItems = [
    {
      title: "Products",
      description: "Add, edit, delete products and variants",
      path: "/admin/products",
      icon: <Package className="w-8 h-8" />,
      color: "#751024",
    },
    {
      title: "Collections",
      description: "Organize products into collections",
      path: "/admin/collections",
      icon: <Layers className="w-8 h-8" />,
      color: "#751024",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-[#751024]" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">
            Manage your store's products, collections, and more from here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                group relative bg-white border border-gray-200 rounded-xl p-6 
                hover:shadow-lg hover:border-[#751024]/30 transition-all duration-200
                text-left overflow-hidden
              `}
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#751024]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 text-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#751024] transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}