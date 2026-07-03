import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user, signUp, loading } = useAuthStore();
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

    const { success } = await signUp(name, email, password);
    if (success) return navigate("/");
  }
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="  w-full max-w-xl mx-auto bg-surface rounded-xl py-6 px-5">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mx-auto text-center text-primary mb-8">
          Create An Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password..."
            className="bg-white rounded-lg p-2 w-full outline-none border border-gray-300"
          />
          <button
            className="w-full bg-primary rounded-xl text-white text-center outline-none border-none py-2 cursor-pointer font-bold text-lg disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader size={20} className="animate-spin" /> : "Submit"}
          </button>
        </form>

        <div className="text-center mt-5 text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
