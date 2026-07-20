import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { getErrMsg } from "../lib/utils";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  loading: false,
  error: null,
  allProducts: [],
  fetchingProducts: false,
  categoryProducts: [],
  getAllProducts: async () => {
    if (get().fetchingProducts) return;
    set({ fetchingProducts: true, error: null });

    try {
      const response = await axiosInstance.get("/products");
      set({ allProducts: response.data.products });
    } catch (err) {
      const errMsg = getErrMsg(err);
      set({ error: errMsg });
    } finally {
      set({ fetchingProducts: false });
    }
  },
  getProductsByCategory: async (category) => {
    set({ fetchingProducts: true });
    try {
      const response = await axiosInstance.get(
        "/products/category/" + category,
      );
      set({ categoryProducts: response.data.products });
    } catch (err) {
      const errMsg = getErrMsg(err);
      set({ error: errMsg });
    } finally {
      set({ fetchingProducts: false });
    }
  },

  // create product function
  createProduct: async (prodcutData) => {
    const { name, description, price, category, image } = prodcutData;
    if (!name || !description || !price || !category || !image)
      return toast.error("All fields are required", {
        id: "missing produt field",
      });
    try {
      const response = await axiosInstance.post("/products/create", {
        ...prodcutData,
      });
      set({ allProducts: [...get().allProducts, response.data.product] });
      toast.success("Product Created Successfully");
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "error creating product" });
      return { success: false };
    }
  },

  // toggle featured products
  toggleFeaturedProduct: async (productId) => {
    try {
      await axiosInstance.patch("/products/" + productId);

      set({
        allProducts: get().allProducts.map((el) => {
          if (el._id === productId) {
            return { ...el, isFeatured: !el.isFeatured };
          }
          return el;
        }),
      });
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "featured product error" });
    }
  },

  // delete product function
  deleteProduct: async (productId) => {
    try {
      await axiosInstance.delete("/products/" + productId);
      set({
        allProducts: get().allProducts.filter((el) => el._id !== productId),
      });
      toast.success("product deleted Successfully");
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "delete product" });
    }
  },
}));
