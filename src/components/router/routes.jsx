import { createBrowserRouter } from "react-router";
import HomePage from "../pages/homepage/HomePage";
import MainLayout from "../../layout/MainLayout";
import DesignLogoPage from "../Home/DesignLogo";
import NewArrival from "../pages/clothes/NewArrival";
import TopSelling from "../pages/clothes/TopSelling";
import SignUp from "../signUpHeader/SignUp";
import Login from "../signUpHeader/Login";
import Shop from "../pages/clothes/Shop";
import DesignLogo from "../Home/DesignLogo";
import ProductDetails from "../products/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../signUpHeader/Profile";
import Settings from "../signUpHeader/Settings";

// Seller
import SellerLayout from "../pages/dashboard/SellerLayout";
import SellerDashboard from "../pages/dashboard/SellerDashboard";
import SellerProducts from "../pages/dashboard/SellerProducts";
import SellerOrders from "../pages/dashboard/SellerOrders";
import SellerProfile from "../pages/dashboard/SellerProfile";
import SellerActivity from "../pages/dashboard/SellerActivity"; // ✅ Added

const router = createBrowserRouter([
  // 🔹 Buyer / Public Layout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "design-logo-page", element: <DesignLogoPage /> },
      { path: "new-arrivals", element: <NewArrival /> },
      { path: "top-selling", element: <TopSelling /> },
      { path: "shop", element: <Shop /> },
      { path: "design-logo", element: <DesignLogo /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  // 🔹 Auth Pages
  { path: "signup", element: <SignUp /> },
  { path: "login", element: <Login /> },

  // 🔹 Seller Layout
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      { path: "dashboard", element: <SellerDashboard /> },
      { path: "products", element: <SellerProducts /> },
      { path: "orders", element: <SellerOrders /> },
      { path: "profile", element: <SellerProfile /> },
      { path: "activity", element: <SellerActivity /> }, // ✅ Added
    ],
  },
]);

export default router;
