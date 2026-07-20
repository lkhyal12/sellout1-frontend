import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { getErrMsg } from "../lib/utils";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,
  error: null,
  laodingProducts: false,
  getCartProducts: async () => {
    set({ laodingProducts: true });
    try {
      const response = await axiosInstance.get("/cart");
      set({ cart: response.data.cart });
    } catch (err) {
      const errMsg = getErrMsg(err);
      set({ error: errMsg });
    } finally {
      set({ laodingProducts: false });
    }
  },

  // add to cart function
  addToCartFun: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/cart/items", { productId });
      set({ cart: response.data.cart });
      toast.success("product added to cart successfully");
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: errMsg });
    }
  },

  // remove from Cart
  removeFromCart: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.delete("/cart/items/" + productId);
      toast.success("Product removed from cart", {
        id: "remove product from cart",
      });
      set({ cart: get().cart.filter((p) => p.product._id !== productId) });
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "error in removing from cart" });
    }
  },
  // update quantity
  updateQuantity: async (productId, quantity) => {
    try {
      const response = await axiosInstance.patch("/cart/items/" + productId, {
        quantity,
      });

      set({
        cart: get().cart.map((p) => {
          if (p.product._id === productId) return { ...p, quantity };
          return p;
        }),
      });
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg);
    }
  },
}));
