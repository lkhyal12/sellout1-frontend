import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { getErrMsg } from "../lib/utils";

export const useProductStore = create((set) => ({
  loading: false,
  error: null,
  allProducts: [],
  categoryProducts: [],
  getProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products/" + category);
      set({ categoryProducts: response.data.products });
    } catch (err) {
      const errMsg = getErrMsg(err);
      set({ error: errMsg });
    } finally {
      set({ loading: false });
    }
  },
}));
