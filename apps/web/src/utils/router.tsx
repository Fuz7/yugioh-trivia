import { createBrowserRouter, Outlet } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import AuthLayout, { PublicRoute } from "../pages/auth/layout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import AppLayout, { ProtectedRoute } from "../pages/dashboard/layout";
import Dashboard from "../pages/dashboard";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        element: (
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        ),
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
]);
