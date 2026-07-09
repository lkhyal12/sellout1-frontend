import React from "react";
import enevelopeLock from "../assets/envelopeLock1.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Fingerprint,
  FireExtinguisher,
  Loader,
  Mail,
  MousePointer,
  RotateCcw,
  ShieldCheck,
  Touchpad,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const CheckEmail = () => {
  const navigate = useNavigate();
  const email = useLocation().state?.email;
  const { loading, sendForgotPasswordLink } = useAuthStore();

  async function handleSubmit() {
    const { success } = await sendForgotPasswordLink(email);
  }
  if (!email)
    return (
      <h1 className="text-white font-bold pageTitle">Missing Email address</h1>
    );
  return (
    <div className="min-h-dvh w-full overflow-hidden ">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="leftSide hidden md:block h-dvh relative">
          <div className="absolute inset-0  flex items-center justify-center h-full ">
            <img
              src={enevelopeLock}
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
                <Mail className="size-5 text-orange-primary" />
                <h4 className="text-white font-bold"> Forgot Password</h4>
              </div>

              <h3 className=" mb-5 text-4xl text-white font-bold">
                We've sent you a
                <span className="text-orange-primary"> Reset link </span>.
              </h3>

              <p className="text-text-secondary">
                Check your email and follow the instructions to reset your
                password.
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
        <div className="h-full bg-background max-md:pt-26 py-5 max-md:px-4 flex justify-center items-center">
          <h2
            className="block md:hidden text-3xl absolute -top-3 left-1/2 transform -translate-x-1/2 font-bold my-5 text-center text-white cursor-pointer w-full bg-surface py-5"
            onClick={() => navigate("/")}
          >
            SELL<span className="text-orange-primary">OUT</span>
          </h2>

          <div className="mx-auto w-full max-w-lg my-auto text-center">
            <div className=" w-full flex items-center justify-center">
              <CheckCircle className="text-success size-20" />
            </div>
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
              Check Your Email
            </h2>
            <p className="text-text-secondary mb-3">
              We've sent a password reset link to <br />
              <span className="font-semibold text-orange-primary">{email}</span>
            </p>
            <p className="text-text-secondary mb-3">
              The link will expire in{" "}
              <span className="font-semibold text-orange-primary">
                15 minutes
              </span>
            </p>

            <div className="bg-surface rounded-lg mb-6 text-left py-6 px-5 flex flex-col gap-5">
              <h3 className="font-bold text-white text-lg">What to do next</h3>

              <div className="flex relative items-center gap-3  pb-2">
                <Mail size={30} className="text-orange-primary p" />
                <div>
                  <h4 className="font-bold text-white">Open your inbox</h4>
                  <p className="text-text-secondary text-sm mt-1">
                    Look for an email from us
                  </p>
                </div>

                <div className="w-9/10 absolute -bottom-2 left-[5%] border-b-[0.5px] border-gray-800"></div>
              </div>

              <div className="flex items-center relative gap-3  pb-2">
                <MousePointer size={30} className="text-orange-primary p" />
                <div>
                  <h4 className="font-bold text-white">Click the reset link</h4>
                  <p className="text-text-secondary text-sm mt-1">
                    It will take to the reset password page
                  </p>
                </div>
                <div className="w-9/10 absolute -bottom-2 left-[5%] border-b-[0.5px] border-gray-800"></div>
              </div>

              <div className="flex items-center relative gap-3  pb-2">
                <ShieldCheck size={30} className="text-orange-primary p" />
                <div>
                  <h4 className="font-bold text-white">
                    Create a new password
                  </h4>
                  <p className="text-text-secondary text-sm mt-1">
                    Choose a strong password to secure your account
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full  outline-none  border border-orange-primary bg-surface text-orange-primary flex justify-center items-center h-10 font-semibold rounded-lg cursor-pointer disabled:pointer-events-none disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <div className="flex items-center gap-1">
                  <RotateCcw size={20} />
                  Resend Reset Link
                </div>
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

export default CheckEmail;
