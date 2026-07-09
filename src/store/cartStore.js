import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { getErrMsg } from "../lib/utils";

export const useCartStore = create((set) => ({
  cart: [],
  loading: false,
  error: null,
  getCartProducts: async () => {
    set({ laoding: true });
    try {
      const response = await axiosInstance.get("/cart");
      set({ cart: response.data.cart });
    } catch (err) {
      const errMsg = getErrMsg(err);
      set({ error: errMsg });
    } finally {
      set({ loading: false });
    }
  },
}));
