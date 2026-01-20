import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Collections from "../pages/Collections";
import Cart from "../pages/Cart";
import CustomGifts from "../pages/CustomGifts";

import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminCollections from "../pages/admin/Collections";
import AdminRoute from "./AdminRoutes";
import AdminProducts from "../pages/admin/Products";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/custom-gift" element={<CustomGifts />} />

      {/* Admin login (public) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin protected routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/collections"
        element={
          <AdminRoute>
            <AdminCollections />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
