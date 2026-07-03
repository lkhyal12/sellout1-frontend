import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";

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
    <div className="h-full w-full flex items-center justify-center ">
      <div className="  w-full max-w-xl mx-auto bg-surface rounded-xl py-6 px-5">
        <h2 className="mainHeading">Log In</h2>

        <form action="" className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submitBtn" disabled={loading}>
            {loading ? <Loader size={20} className="animate-spin" /> : "Submit"}
          </button>
        </form>

        <div className="text-center mt-5 text-white">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 font-semibold">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
