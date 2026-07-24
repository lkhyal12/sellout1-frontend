import { Loader, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { user } = useAuthStore();
  const { addToCartFun } = useCartStore();
  const [loading, setLoading] = useState(false);
  async function handleAddToCart(productId) {
    if (!user)
      return toast.error("Please Login First", { id: "Please Login First" });
    setLoading(true);
    await addToCartFun(productId);
    setLoading(false);
  }
  return (
    <div className="w-full bg-surface rounded-xl shadow overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full object-cover aspect-square"
      />
      <div className="px-2 py-2">
        <h3 className="font-bold text-white text-lg mb-3">{product.name}</h3>
        <h4 className="text-white font-bold mb-3">
          ${product.price.toFixed(2)}
        </h4>

        <button
          className="w-full bg-orange-primary text-white rounded-lg cursor-pointer  flex items-center justify-center gap-2 py-2 disabled:opacity-60 disabled:pointer-events-none"
          onClick={() => handleAddToCart(product._id)}
          disabled={loading}
        >
          {loading ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <>
              <ShoppingCart size={20} /> Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
