import { Link } from "react-router-dom";
import {
  Lock,
  ShoppingCart,
  ShieldCheck,
  Tags,
  ArrowRight,
} from "lucide-react";

const CartLoginRequired = () => {
  return (
    <section className="min-h-[calc(100dvh-60px)] flex items-center justify-center px-5 py-20">
      <div className="w-full max-w-5xl">
        {/* Card */}
        <div className="bg-surface rounded-3xl border border-divider shadow-xl p-8 md:p-12">
          {/* Hero */}
          <div className="flex flex-col items-center text-center">
            {/* Illustration */}
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-orange-primary/20 blur-3xl"></div>

              <div className="relative size-40 rounded-full bg-background border border-divider flex items-center justify-center">
                <ShoppingCart
                  className="text-orange-primary"
                  size={72}
                  strokeWidth={1.8}
                />

                <div className="absolute -top-2 -right-2 size-14 rounded-full bg-orange-primary flex items-center justify-center shadow-lg">
                  <Lock className="text-white" size={28} />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Your Cart is <span className="text-orange-primary">Waiting</span>
            </h1>

            <p className="mt-4 text-text-secondary max-w-xl leading-relaxed">
              Sign in to view your cart, save your favorite products, and
              complete your purchase securely from any device.
            </p>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <Link
                to="/login"
                className="bg-orange-primary hover:brightness-110 transition h-12 px-8 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              >
                Log In
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/sign-up"
                className="border border-divider bg-background hover:border-orange-primary transition h-12 px-8 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              >
                Create Account
              </Link>
            </div>

            <Link
              to="/categories"
              className="mt-5 text-orange-primary hover:underline font-medium"
            >
              Continue Shopping →
            </Link>
          </div>

          {/* Bottom features */}

          <div className="grid md:grid-cols-3 gap-8 mt-14 border-t border-divider pt-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-background flex items-center justify-center">
                <ShieldCheck className="text-orange-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-white">Secure Checkout</h3>

                <p className="text-text-secondary text-sm">
                  Your information is always protected.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-background flex items-center justify-center">
                <ShoppingCart className="text-orange-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-white">Save Your Cart</h3>

                <p className="text-text-secondary text-sm">
                  Continue shopping anytime after signing in.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-background flex items-center justify-center">
                <Tags className="text-orange-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-white">Exclusive Offers</h3>

                <p className="text-text-secondary text-sm">
                  Unlock discounts and personalized deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartLoginRequired;
