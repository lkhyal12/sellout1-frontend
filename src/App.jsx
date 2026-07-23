import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import mainBgImg from "./assets/background.png";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { LoaderCircle } from "lucide-react";
import AppLayout from "./pages/AppLayout";
import CategoriesPage from "./pages/CategoriesPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailCheckPage from "./pages/EmailCheckPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";

const App = () => {
  const { getProfile, user, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  console.log({ user });
  if (isCheckingAuth)
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-background text-white">
        <LoaderCircle size={60} className="animate-spin" />
      </div>
    );
  if (
    !isCheckingAuth &&
    user &&
    !user.verified &&
    location.pathname !== "/verify-email"
  )
    return <Navigate to="/verify-email" />;
  return (
    <>
      {/* <Navbar /> */}
      <Toaster position="top-center" />
      <main className="min-h-dvh ">
        <div className="fixed inset-0 -z-10 w-screen h-dvh">
          <img src={mainBgImg} alt="" className="size-full object-cover" />
        </div>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:category" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          </Route>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:code" element={<ResetPasswordPage />} />
          <Route path="/email-check" element={<EmailCheckPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
