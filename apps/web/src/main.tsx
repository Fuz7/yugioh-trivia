import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import './App.css'
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard from "./pages/dashboard";
import AuthLayout from "./pages/auth/layout";
import AppLayout from "./pages/dashboard/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {index:true, element: <Dashboard />},
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
