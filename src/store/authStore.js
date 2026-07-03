import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { getErrMsg } from "../lib/utils";

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  loading: false,
  // sign up function
  signUp: async (name, email, password) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/sign-up", {
        name,
        email,
        password,
      });

      set({ user: response.data.user, accessToken: response.data.accessToken });
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg);
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // login function
  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      set({ user: response.data.user, accessToken: response.data.accessToken });
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "login" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));
