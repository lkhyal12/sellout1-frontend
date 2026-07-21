import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { getErrMsg } from "../lib/utils";

import { ArrowRight, CheckCircle, Loader, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function completeCheckout() {
      if (!sessionId) return navigate("/");
      setLoading(true);
      try {
        const response = await axiosInstance.post("/checkout/success", {
          sessionId,
        });
        const { data, status: statusCode } = response;

        if (statusCode === 201) useCartStore.setState({ cart: [] });
        setOrderId(data.orderId);
      } catch (err) {
        const errMsg = getErrMsg(err);
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    }
    completeCheckout();
  }, [sessionId, navigate]);

  if (error || loading)
    return (
      <div className="flex items-center justify-center h-dvh w-full">
        {loading && <Loader size={30} className="text-white animate-spin" />}
        {error && (
          <h2 className="text-red-600 text-[5vw] text-center font-semibold max-w-2xl">
            {error}
          </h2>
        )}
      </div>
    );
  return (
    <div className="min-h-screen bg-background  flex items-center justify-center px-6 pt-15">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8 text-center border border-divider">
        <div className="flex justify-center">
          <div className="bg-green-500/20 p-4 rounded-full">
            <CheckCircle size={60} className="text-green-400" />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Payment Successful!
        </h1>

        <p className="mt-3 text-gray-400">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="mt-8 bg-divider rounded-xl p-4 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className="text-green-400 font-semibold">Paid</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Order</span>
            <span className="text-white">#{orderId}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
            <ShoppingBag size={18} />
            View Orders
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 border border-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
