import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import {
  Loader,
  LoaderCircle,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Trash,
} from "lucide-react";
import EmptyCart from "../components/EmptyCart";
import CartLoginRequired from "../components/CartLoginRequired";
import { useAuthStore } from "../store/authStore";

const CartPage = () => {
  const { user, isCheckingAuth } = useAuthStore();
  const {
    cart,
    laodingProducts,
    getCartProducts,
    updateQuantity,
    removeFromCart,
    createStripeSession,
    loadingSession,
  } = useCartStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);
  if (!user && !isCheckingAuth) return <CartLoginRequired />;
  if (laodingProducts)
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-background text-white">
        <LoaderCircle size={60} className="animate-spin" />
      </div>
    );
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="min-h-dvh pt-20 pb-10 max-sm:px-4">
      <div className="container mx-auto h-full">
        <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">
          Your Cart
        </h2>
        <div className="flex items-center gap-2 mt-2 mb-3">
          <ShieldCheck size={10} className="text-success" />
          <p className="text-text-secondary text-sm">
            Secure checkout. We don't share your personal details.
          </p>
        </div>

        {/* desktop products container */}
        <div className="flex flex-col lg:flex-row gap-5">
          {windowWidth <= 576 ? (
            <div>
              <MobileProductsDesign
                products={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            </div>
          ) : (
            <div className="lg:w-7/10 bg-surface px-2 rounded-lg ">
              <DeskTopProductsContainer
                products={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            </div>
          )}
          <div className="bg-surface rounded-lg shadow w-full lg:w-1/3 p-4 h-full">
            <h3 className="font-semibold text-lg text-white flex items-center gap-2">
              <ShoppingBag size={20} /> Order Summary
            </h3>

            <div className="flex items-center justify-between">
              {/* left side */}
              <div className="flex flex-col gap-1  mt-4 text-text-secondary text-sm">
                <span>Total</span>
                <span>Shipping</span>
                <span>Discount</span>
              </div>

              {/* right side */}
              <div className="flex flex-col gap-1  mt-4 text-text-secondary text-sm h-fit ">
                <span className="font-semibold text-white">
                  $
                  {cart
                    .reduce((a, e) => a + e.product.price * e.quantity, 0)
                    .toFixed(2)}
                </span>
                <span className="text-success">Free</span>
                <span className="text-success">-$0.00</span>
              </div>
            </div>
            <div className="flex-1 ">
              <button
                className="bg-orange-primary text-white flex items-center justify-center gap-2 cursor-pointer rounded-lg w-full mt-4 h-9 disabled:opacity-60 disabled:pointer-events-none"
                disabled={loadingSession}
                onClick={createStripeSession}
              >
                {loadingSession ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <>
                    <Lock size={15} />
                    Procced To Checkout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function DeskTopProductsContainer({
  products,
  updateQuantity,
  removeFromCart,
}) {
  return (
    <table className="w-full border-collapse">
      <thead className="text-text-secondary">
        <tr className="border-b border-divider">
          <th className="text-left py-4">Product</th>
          <th className="text-center py-4">Price</th>
          <th className="text-center py-4">Quantity</th>
          <th className="text-center py-4">Subtotal</th>
          <th className="text-center py-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr
            key={item.product._id}
            className="border-b border-divider last:border-none"
          >
            <td className="py-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-white">
                    {item.product.name}
                  </h3>

                  <p className="text-sm text-text-secondary">
                    {item.product.category}
                  </p>
                  <span className="text-sm text-success space-x-1">
                    <span className="size-1.5 mr-1 inline-block bg-success rounded-full" />
                    In stock
                  </span>
                </div>
              </div>
            </td>

            {/* price */}
            <td className="text-center text-white font-semibold">
              ${item.product.price.toFixed(2)}
            </td>

            {/* quantity */}
            <td className="text-center text-white font-semibold">
              <div className="flex justify-center items-center gap-2 border border-divider rounded w-fit mx-auto">
                <button
                  className="text-xl font-bold bg-background rounded w-7 aspect-square cursor-pointer disabled:text-text-secondary disabled:opacity-80 disabled:pointer-events-none flex items-center justify-center"
                  disabled={item.quantity <= 1}
                  onClick={async () =>
                    await updateQuantity(item.product._id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span> {item.quantity}</span>
                <button
                  className="text-xl font-bold bg-background rounded w-7 aspect-square cursor-pointer disabled:text-text-secondary disabled:opacity-60 flex items-center justify-center"
                  onClick={async () =>
                    await updateQuantity(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </td>
            {/* subtotal */}
            <td className="text-center text-orange-primary font-bold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </td>

            {/* actions */}
            <td className="text-center">
              <Trash
                size={20}
                className="text-error cursor-pointer text-center inline-block"
                onClick={async () => await removeFromCart(item.product._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MobileProductsDesign({ products, updateQuantity, removeFromCart }) {
  return (
    <>
      {products.map((item) => (
        <div
          key={item.product._id}
          className="bg-surface rounded-lg mb-5 shadow-sm flex items-center justify-between p-2"
        >
          <div className="flex items-center gap-3">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="size-20 rounded-md"
            />
            <div className="">
              <h3 className="text-white font-semibold">{item.product.name}</h3>
              <p className="text-semibold text-text-secondary">
                {item.product.category}
              </p>
              <h4 className="font-bold text-orange-primary">
                ${item.product.price.toFixed(2)}
              </h4>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 items-end">
            <div className="flex justify-center  items-center gap-2 border border-divider rounded w-fit mx-auto">
              <button
                className="text-xl font-bold bg-background rounded w-7 aspect-square cursor-pointer  text-white disabled:text-text-secondary disabled:opacity-80 disabled:pointer-events-none flex items-center justify-center"
                disabled={item.quantity <= 1}
                onClick={async () =>
                  await updateQuantity(item.product._id, item.quantity - 1)
                }
              >
                -
              </button>
              <span className="font-bold text-white"> {item.quantity}</span>
              <button
                className="text-xl text-white font-bold bg-background rounded w-7 aspect-square cursor-pointer disabled:text-text-secondary disabled:opacity-60 flex items-center justify-center"
                onClick={async () =>
                  await updateQuantity(item.product._id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
            <Trash
              size={20}
              className="cursor-pointer text-error"
              onClick={async () => removeFromCart(item.product._id)}
            />
          </div>
        </div>
      ))}
    </>
  );
}
export default CartPage;
