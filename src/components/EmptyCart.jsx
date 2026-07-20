import { ShoppingCart, ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 pt-10">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-28 h-28 rounded-full bg-surface flex items-center justify-center">
          <ShoppingCart
            size={56}
            className="text-orange-primary"
            strokeWidth={1.8}
          />
        </div>

        <h2 className="text-3xl font-bold text-white mt-8">
          Your cart is empty
        </h2>

        <p className="text-text-secondary mt-3 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Browse our
          collection and discover your next favorite product.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full h-11 rounded-lg bg-orange-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </button>

        <div className="flex justify-center items-center gap-2 mt-6 text-success">
          <ShieldCheck size={18} />
          <span className="text-sm">Secure checkout when you're ready</span>
        </div>
      </div>
    </div>
  );
}
