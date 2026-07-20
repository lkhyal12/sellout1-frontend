import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { getErrMsg } from "../lib/utils";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  loading: false,
  isAdmin: false,
  isCheckingAuth: true,
  isSendingEmail: false,
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
  // logout function
  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logged out successfully");
      set({ user: null, isAdmin: false });
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg);
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

      set({
        user: response.data.user,
        isAdmin: response.data.user.role === "admin",
      });
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
      set({
        user: response.data.user,
        isAdmin: response.data.user.role === "admin",
      });
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

  sendForgotPasswordLink: async (email) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.post(
        "/auth/send-password-reset-link",
        { email },
      );
      toast.success("Reset password link was sent");
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "passwordResetError" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // reset password function
  resetPassword: async (code, password) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post(
        "/auth/reset-password/" + code,
        { password },
      );
      toast.success("Password reset successfully");
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: errMsg });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // send email verification code function
  sendEmailVerificationCode: async (email) => {
    set({ isSendingEmail: true });
    try {
      const response = await axiosInstance.post(
        "/auth/send-email-verification",
        { email },
      );
      toast.success("Verification code was sent to your email");
      return { success: true };
    } catch (err) {
      const errMsg = getErrMsg(err);
      toast.error(errMsg, { id: "verification code error" });
    } finally {
      set({ isSendingEmail: false });
    }
  },
}));
