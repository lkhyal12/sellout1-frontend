import React, { useEffect, useRef, useState } from "react";
import envelopeImg from "../assets/envelope1.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader, Mail, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
const VerifyEmailPage = () => {
  const [code, setCode] = useState(Array.from({ length: 6 }).fill(""));
  const { loading, user, verifyEmail } = useAuthStore();
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  function handleChange(e, idx) {
    const value = e.target.value.trim();
    if (/\D/.test(value)) {
      return toast.error("Only digits are allowed", {
        id: "otp-error",
      });
    }

    const newCode = [...code];
    if (value.length === 1) {
      newCode[idx] = value;
      inputsRef.current[idx + 1]?.focus();
    } else {
      const splitedValue = value.split("").splice(0, 6 - idx);
      splitedValue.forEach((el, i) => {
        newCode[i + idx] = el;
      });
      const focusIdx = Math.min(code.length - 1, splitedValue.length + idx);
      inputsRef.current[focusIdx]?.focus();
    }
    setCode([...newCode]);
  }

  function handleKeyDown(e, idx) {
    if (e.key !== "Backspace") return;

    const newCode = [...code];
    if (code[idx]) {
      newCode[idx] = "";
      setCode(newCode);
      return;
    }
    if (idx) {
      newCode[idx - 1] = "";
      setCode(newCode);
      inputsRef.current[idx - 1].focus();
    }
  }

  async function handleSubmit() {
    if (!code.every((el) => el !== ""))
      return toast.error("Code must be 6-digit charcters", {
        id: "code inefecient",
      });

    const codeJoind = code.join("");
    const { success } = await verifyEmail(email, codeJoind);
    if (success) {
      toast.success("Email verified successfully");
      return navigate("/");
    }
  }

  // handle click function
  function handleClick(index) {
    inputsRef.current[index]?.setSelectionRange(1, 1);
  }
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);
  useEffect(() => {
    if (code.every(Boolean)) {
      handleSubmit();
    }
  }, [code]);
  if (user && user.verified) return <Navigate to="/" replace={true} />;
  if (!email)
    return (
      <div className="h-dvh w-full overflow-hidden flex items-center justify-center">
        <h2
          className="block md:hidden text-3xl absolute -top-3 left-1/2 transform -translate-x-1/2 font-bold my-5 text-center text-white cursor-pointer w-full bg-surface py-5"
          onClick={() => navigate("/")}
        >
          SELL<span className="text-orange-primary">OUT</span>
        </h2>
        <h2 className="msg text-error">Missing Email Address</h2>
      </div>
    );
  return (
    <div className="h-dvh w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="leftSide hidden md:block h-dvh relative">
          <div className="absolute inset-0  flex items-center justify-center h-full ">
            <img
              src={envelopeImg}
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
                <h4 className="text-white font-bold">Verify Your Email</h4>
              </div>

              <h3 className=" mb-5 text-4xl text-white font-bold">
                One last step
                <span className="text-orange-primary"> To get started</span>
              </h3>

              <p className="text-text-secondary">
                We Have sent a 6-digit verification code to your email address
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
              Verify Your Email
            </h2>
            <p className="text-text-secondary mb-3">
              Enter the 6-digit code sent to
            </p>
            <h5 className=" font-bold text-orange-primary">{email}</h5>
            <div className="flex items-center justify-between w-full">
              {code.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, i)}
                  ref={(el) => (inputsRef.current[i] = el)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onClick={() => handleClick(i)}
                  className="size-13 md:size-15 mt-7 text-white text-center text-2xl md:text-3xl font-bold rounded-lg outline-none border border-divider focus:border-orange-primary"
                />
              ))}
            </div>

            <p className="text-text-secondary my-5">
              Didn't receive the code?{" "}
              <span className="text-orange-primary font-semibold">
                Resend code now
              </span>
            </p>

            <button
              onClick={handleSubmit}
              className="w-full border-none outline-none bg-orange-primary text-white flex justify-center items-center h-10 font-bold rounded-lg cursor-pointer disabled:pointer-events-none disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Verify Email"
              )}
            </button>

            <div className="devider flex items-center gap-2 my-5">
              <div className="bg-gray-600 h-px rounded-2xl flex-1"></div>
              <p className="text-text-secondary">Or</p>
              <div className="bg-gray-600 h-px rounded-2xl flex-1"></div>
            </div>

            <button className="w-full outline-none bg-surface border border-gray-500 text-white flex justify-center items-center h-10 font-bold rounded-lg cursor-pointer py-1 gap-2">
              <Mail size={20} />
              Resend Code
            </button>

            <p className="text-text-secondary my-5 text-center">
              Wrong email address?
              <span className="ml-2 text-orange-primary font-semibold">
                Change Email
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
