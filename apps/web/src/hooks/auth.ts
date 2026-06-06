import { useNavigate } from "react-router";
import { loginUser, registerUser } from "../lib/api/auth";
import { useContext, useEffect, useMemo, useState } from "react";
import type { LoginUser, RegisterUser } from "@app/shared";
import AuthContext from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
export default useAuth;
