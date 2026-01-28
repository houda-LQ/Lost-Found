import { create } from "zustand";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

export const useAuthStore = create((set) => ({
  user: user || null,
  token: token || null,
  isAuthenticated: !!token,

  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
