import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Box, Loader, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import bagImg from "../assets/bag.png";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, login } = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email?.trim() || !password)
      return toast.error("Email And Password Are Required", {
        id: "Missing fields",
      });

    const { success } = await login(email.trim(), password);
    if (success) return navigate("/");
  }
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <div className="w-full flex items-center gap-2">
        {/* left side */}
        <div className="hidden md:flex relative w-1/2  h-dvh">
          <div className="absolute inset-0 z-0">
            <img
              src={bagImg}
              alt="hoodie"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/20 zoom-110"></div>
          </div>

          <div className="relative z-10 p-10 max-w-md">
            <h2
              className="text-white text-4xl cursor-pointer font-bold max-w-md"
              onClick={() => navigate("/")}
            >
              SELL
              <span className="text-orange-primary uppercase ">Out</span>
            </h2>

            <div className="bg-surface/50 rounded-md flex items-center gap-2 w-fit px-4 my-5 py-1">
              <ShoppingBag className="size-5 text-orange-primary" />
              <h4 className="text-white font-bold">Shop Now</h4>
            </div>
            <h3 className=" mb-5 text-4xl text-white font-bold">
              Glad to see you back
              <span className="text-orange-primary"> Again!</span>
            </h3>

            <p className="text-text-secondary">
              Don't miss out on your favorite items—log in to your account today
              to continue shopping.
            </p>

            <div className="mt-10">
              <div className="flex items-center gap-5">
                <div className="bg-surface/40 rounded-md  size-15">
                  <Users className="text-orange-primary size-15 p-2" />
                </div>{" "}
                <div>
                  <h3 className="text-white font-bold text-3xl">10k+</h3>
                  <p className="text-text-secondary">Happy Users</p>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-5">
                <div className="bg-surface/40 rounded-md  size-15">
                  <Box className="text-orange-primary size-15 p-2" />
                </div>{" "}
                <div>
                  <h3 className="text-white font-bold text-3xl">30K+</h3>
                  <p className="text-text-secondary">Products Sold</p>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-5">
                <div className="bg-surface/40 rounded-md ">
                  <ShoppingCart className="text-orange-primary size-15 p-2" />
                </div>{" "}
                <div>
                  <h3 className="text-white font-bold text-3xl">50k+</h3>
                  <p className="text-text-secondary">Order Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center  min-h-dvh py-5 px-4">
          <h2
            className="block md:hidden text-3xl font-bold my-5 text-center text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            SELL<span className="text-orange-primary">OUT</span>
          </h2>
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            Create Your Account
          </h2>

          <p className=" mt-5 text-text-secondary">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-orange-primary">
              Sign Up Now
            </Link>
          </p>
          <div className="formContainer border p-5 border-divider w-9/10 rounded-lg mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div>
                <label
                  htmlFor="email"
                  className="text-white font-semibold mb-2 block"
                >
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 outline-none border-divider border text-white bg-surface/50 rounded-md"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-right">
                <Link to="/forgot-password" className="text-orange-primary">
                  Forgot Password?
                </Link>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="text-white font-semibold mb-2 block"
                >
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 outline-none border-divider border text-white bg-surface/50 rounded-md"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <input type="checkbox" name="remember-me" id="remember-me" />
                <span className="text-orange-primary">Rememeber me</span>
              </div>
              <button
                className="bg-orange-primary text-white w-full flex items-center justify-center h-10 rounded-lg cursor-pointer font-bold disabled:opacity-60 disabled:pointer-events-none"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="size-6 animate-spin" />
                ) : (
                  "Log In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
