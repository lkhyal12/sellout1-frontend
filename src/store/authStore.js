import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { getErrMsg } from "../lib/utils";

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  loading: false,
  isAdmin: false,
  isCheckingAuth: true,
  // sign up function
  signUp: async (name, email, password) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/sign-up", {
        name,
        email,
        password,
      });

      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        isAdmin: response.data.user.role === "admin",
      });
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
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        isAdmin: response.data.user.role === "admin",
      });
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "login" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // verify email function
  verifyEmail: async (email, code) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/verify-email", {
        email,
        code,
      });

      set({ user: response.data.user });
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "error verifyin email" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // getProfile
  getProfile: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ user: response.data.user });
      console.log(response);
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      set({ user: null });
      return { success: false, error: errMsg };
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
