import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import {
  Loader,
  Package,
  ShieldEllipsis,
  ShoppingBag,
  Zap,
} from "lucide-react";
import hoodieImg from "../assets/yellow-hoodie.jpg";
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user, signUp, loading } = useAuthStore();
  const checkBoxRef = useRef();
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (!name?.trim() || !email?.trim() || !password || !confirmPassword)
      return toast.error("All fields are required", { id: "signUp" });
    if (password !== confirmPassword)
      return toast.error("Password do not match", { id: "passwords match" });
    if (!checkBoxRef.current?.checked)
      return toast.error("Please to Agree Terms & Conditions First", {
        id: "condtions",
      });
    const { success } = await signUp(name, email, password);
    if (success) return navigate("/verify-email", { state: { email } });
  }
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <div className="w-full flex items-center gap-2">
        {/* left side */}
        <div className="hidden md:flex relative w-1/2  h-dvh">
          <div className="absolute inset-0 z-0">
            <img
              src={hoodieImg}
              alt="hoodie"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/70 zoom-110"></div>
          </div>

          <div className="relative z-10 p-10 max-w-md">
            <h2
              className="text-white text-4xl font-bold max-w-md cursor-pointer"
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
              Start shopping with Sell
              <span className="text-orange-primary">Out</span>
            </h3>

            <p className="text-text-secondary">
              Create your account and explore thousands of premium products at
              unbeatable prices.
            </p>

            <div className="mt-10">
              <div className="flex items-center gap-5">
                <div className="bg-surface/40 rounded-md  size-15">
                  <Package className="text-orange-primary size-15 p-2" />
                </div>{" "}
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Thousands Of Products
                  </h3>
                  <p className="text-text-secondary">
                    Browse thousands of products at affordable prices.{" "}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-5">
                <div className="bg-surface/40 rounded-md  size-15">
                  <ShieldEllipsis className="text-orange-primary size-15 p-2" />
                </div>{" "}
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Secure & Reliable
                  </h3>
                  <p className="text-text-secondary">
                    Your payments and personal information are protected.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-5">
                <div className="bg-surface/40 rounded-md ">
                  <Zap className="text-orange-primary size-15 p-2" />
                </div>{" "}
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Fast Shipping
                  </h3>
                  <p className="text-text-secondary">
                    Quick shipping with real-time order tracking.{" "}
                  </p>
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
            Already have an account?{" "}
            <Link to="/login" className="text-orange-primary">
              Log in
            </Link>
          </p>
          <div className="formContainer border p-5 border-divider w-9/10 rounded-lg mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-white font-semibold mb-2 block"
                >
                  Full Name:
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-2 outline-none border-divider border text-white bg-surface/50 rounded-md"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
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
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="text-white font-semibold mb-2 block"
                >
                  Confirm Password:
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full p-2 outline-none border-divider border text-white bg-surface/50 rounded-md"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={checkBoxRef}
                  type="checkbox"
                  className="border border-orange-primary bg-transparent text-orange-primary"
                />
                <p className="text-sm text-text-secondary">
                  I agree to the{" "}
                  <span className="text-orange-primary font-semibold">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-orange-primary font-semibold">
                    Privacy Policy
                  </span>
                </p>
              </div>

              <button
                className="bg-orange-primary text-white w-full flex items-center justify-center h-10 rounded-lg cursor-pointer font-bold disabled:opacity-60 disabled:pointer-events-none"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="size-6 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
