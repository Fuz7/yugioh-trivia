import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { loginUser, logoutUser, registerUser } from "../lib/api/auth";
import type { LoginUser, PayloadUser, RegisterUser } from "@app/shared";
import { getMe } from "../lib/api/users";
import { useNavigate } from "react-router";

type AuthContextType = {
  user: null | PayloadUser; // replace User with your actual user type
  isFetchingUser: boolean;
  isPending: boolean;
  error: string | null;
  login: (data: LoginUser) => Promise<PayloadUser | null | void>;
  register: (data: RegisterUser) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<PayloadUser | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsFetchingUser(false));
  }, []);

  async function login(data: LoginUser) {
    setIsPending(true);
    setError(null);
    try {
      const result = await loginUser(data);
      console.log(result);
      setUser(result);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsPending(false);
    }
  }
  async function register(data: RegisterUser) {
    setIsPending(true);
    setError(null);
    try {
      await registerUser(data);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsPending(false);
    }
  }
  async function logout() {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      navigate("/login");
    }
  }

  const value = useMemo(
    () => ({ user, isFetchingUser, isPending, error, login, register, logout }),
    [user, isFetchingUser, isPending, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
