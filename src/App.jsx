import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { LoaderCircle } from "lucide-react";

const App = () => {
  const { getProfile, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (isCheckingAuth)
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-background text-white">
        <LoaderCircle size={60} className="animate-spin" />
      </div>
    );
  return (
    <>
      {/* <Navbar /> */}
      <Toaster position="top-center" />
      <main className="h-dvh bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
