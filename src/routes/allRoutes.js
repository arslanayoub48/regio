import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import Dashbaord from "../components/Dashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import ForgetPassword from "../pages/auth/ForgetPassword";
import TwoStepVerification from "../pages/auth/TwoStepVerification";
import Products from "../pages/products/Products";
import UserProfile from "../pages/profile";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPassword },
  { path: "/otp-verify", component: TwoStepVerification },
];

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashbaord },
  { path: "/module/products", component: Products },
  { path: "/module/help-offered", component: Products },
  { path: "/module/help-searched", component: Products },
  { path: "/module/food-events", component: Products },
  { path: "/module/events", component: Products },
  { path: "/module/search-find", component: Products },
  { path: "/module/rentals", component: Products },
  { path: "/module/resources", component: Products },
  { path: "/module/orders", component: Products },
  { path: "/module/car-pooling", component: Products },
  { path: "/profile", component: UserProfile },
  { path: "/admin/*", component: AdminLayout },
];

export { publicRoutes, authProtectedRoutes };
