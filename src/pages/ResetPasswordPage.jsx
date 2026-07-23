import { ArrowLeft, Loader, ShieldCheck, Lock } from "lucide-react";

import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import sheildImg from "../assets/sheild.png";
import toast from "react-hot-toast";
const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { user, loading, resetPassword } = useAuthStore();
  const { code } = useParams();

  async function handleSubmit() {
    if (password !== confirmPassword)
      return toast.error("Passwords do not macth", {
        id: "passwords mismatch",
      });
    const { success } = await resetPassword(code, password);
    if (success) return navigate("/login");
  }
  if (user) return <Navigate to="/" replace={true} />;
  return (
    <div className="h-dvh w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="leftSide hidden md:block h-dvh relative">
          <div className="absolute inset-0  flex items-center justify-center h-full ">
            <img
              src={sheildImg}
              className="size-full object-cover transform translate-y-2/10"
              alt=""
            />

            <div className="overlay absolute inset-0 bg-background/50 z-10"></div>
          </div>

          <div className="relative z-10 p-10 max-w-md flex flex-col justify-between h-full">
            <div>
              <h2
                className="text-white text-4xl cursor-pointer font-bold max-w-md"
                onClick={() => navigate("/")}
              >
                SELL
                <span className="text-orange-primary uppercase ">Out</span>
              </h2>

              <div className="bg-surface/50 rounded-md flex items-center gap-2 w-fit px-4 my-5 py-1">
                <Lock className="size-5 text-orange-primary" />
                <h4 className="text-white font-bold"> Forgot Password</h4>
              </div>

              <h3 className=" mb-5 text-4xl text-white font-bold">
                Create a new strong
                <span className="text-orange-primary"> Password </span>.
              </h3>

              <p className="text-text-secondary">
                Make sure it's something you will remember.{" "}
              </p>
            </div>
            <div className="iconContainer flex items-center gap-5 mt-5">
              <div className="bg-surface/60 rounded-md ">
                <ShieldCheck className="text-orange-primary size-15 p-2" />
              </div>{" "}
              <div>
                <h3 className="text-white font-bold text-2xl">
                  Secure & Protected
                </h3>
                <p className="text-text-secondary">
                  Your data is encrypted and safe with us
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="h-dvh max-md:px-4 flex justify-center items-center">
          <h2
            className="block md:hidden text-3xl absolute -top-3 left-1/2 transform -translate-x-1/2 font-bold my-5 text-center text-white cursor-pointer w-full bg-surface py-5"
            onClick={() => navigate("/")}
          >
            SELL<span className="text-orange-primary">OUT</span>
          </h2>
          <div className="mx-auto w-full max-w-lg my-auto ">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
              Reset Password
            </h2>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="text-white font-semibold mb-2 block"
              >
                New Password:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                className="w-full p-2 outline-none border-divider border text-white bg-surface/50 rounded-md"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="text-white font-semibold mb-2 block"
              >
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 outline-none border-divider border text-white bg-surface/50 rounded-md"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full border-none outline-none bg-orange-primary text-white flex justify-center items-center h-10 font-bold rounded-lg cursor-pointer disabled:pointer-events-none disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="devider flex items-center gap-2 my-5">
              <div className="bg-gray-600 h-px rounded-2xl flex-1"></div>
              <p className="text-text-secondary">Or</p>
              <div className="bg-gray-600 h-px rounded-2xl flex-1"></div>
            </div>

            <button
              className="w-full outline-none bg-surface border border-gray-500 text-white flex justify-center items-center h-10 font-bold rounded-lg cursor-pointer py-1 gap-2"
              onClick={() => navigate("/login")}
            >
              <ArrowLeft size={20} />
              Back To Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
