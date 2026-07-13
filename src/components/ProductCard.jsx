import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
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

        <button className="w-full bg-orange-primary text-white rounded-lg cursor-pointer flex items-center justify-center gap-2 py-2">
          <ShoppingCart size={20} /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
