import axios from "axios";
import { Router } from "lucide-react";
import { router } from "./router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const isAuthRoute = ["/login", "/register"].includes(
      window.location.pathname,
    );
    const isRefreshRoute = originalRequest.url === "/api/auth/refresh";

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      // Ensures the refresh route is not looping itself
      !isRefreshRoute
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh");
        return api(originalRequest);
      } catch {
        router.navigate("/login",{replace:true})
        return Promise.reject(new Error("Session expired"));
      }
    }

    const message = err.response?.data?.error || "Request failed";
    return Promise.reject(new Error(message));
  },
);
export default api;
