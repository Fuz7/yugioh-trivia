import { useState } from "react";
import logo from "@images/Logo.png";
import { Mail, LockKeyhole, EyeOff, Eye } from "lucide-react";
import { cn } from "../../../utils/clsx";
import { formInputStyling } from "../../../utils/styling";
import { Checkbox } from "../../../ui/Checkbox";
import { loginUser } from "../../../lib/api/auth";
import type { LoginUser } from "@app/shared";
import useAuth from "../../../hooks/auth";

function Login() {
  return (
    <div className="w-full min-h-full flex justify-center items-center text-white">
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [form, setForm] = useState<LoginUser>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { error, isPending, login } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await login(form);
  }

  return (
    <div
      className="flex-1 max-w-107.5 min-h-141.5 bg-card
      border-[#4d4d4d] border rounded-sm relative py-9 px-13
      flex flex-col items-center"
    >
      <span
        className="w-34 h-0.75 bg-[#868686]
        absolute top-0 left-1/2 -translate-x-1/2
        rounded-b-sm"
      />

      <div className="flex flex-col items-center">
        <img src={logo} />
        <h1 className="text-2xl font-matrixIIBold leading-7">
          Yu-Gi-Oh! Trivia!
        </h1>
        <p className="text-tertiary text-sm font-suiss-semi-bold">
          Test your dueling knowledge!
        </p>
      </div>
      {error && (
        <p
          className="text-white-text text-sm mt-2 bg-[#f8524915]
       border flex justify-center border-[#f8524968] 
       text-center rounded-md py-3 px-3 w-full"
        >
          {error}
        </p>
      )}

      <div className="mt-25 flex flex-col w-full">
        <p className="font-suiss-medium text-xl text-white-text">
          Welcome back, duelist
        </p>

        <form className="mt-4 flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="w-full min-h-10 relative">
            <Mail
              className="absolute top-1/2 -translate-y-1/2 left-3 w-4.5 h-4.5"
              color="#919191"
            />
            <input
              id="email"
              name="email"
              autoComplete="email"
              className={cn(formInputStyling)}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full min-h-10 relative mt-1">
            <LockKeyhole
              className="absolute top-1/2 -translate-y-1/2 left-3 w-4.5 h-4.5"
              color="#919191"
            />
            <input
              id="password"
              name="password"
              autoComplete="current-password"
              className={cn(formInputStyling)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              min={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-icon
    hover:text-white transition-colors duration-100 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4.5 h-4.5" />
              ) : (
                <Eye className="w-4.5 h-4.5" />
              )}
            </button>
          </div>

          <div className="mt-4.5 flex gap-2 items-center">
            <Checkbox
              checked={form.rememberMe}
              onChange={(checked) =>
                setForm((prev) => ({ ...prev, rememberMe: checked }))
              }
              label="Stay logged in?"
            />
          
          </div>

          <div className="mt-4 gap-4 flex">
            <a
              href="/register"
              className="flex-1 min-h-10.5 font-matrix-small-caps-2 justify-center flex
              text-3xl bg-[#383737] rounded-md pb-1 text-[#c2c2c2] cursor-pointer
              hover:bg-[#4a4a4a] hover:text-white transition-colors duration-100"
            >
              Register
            </a>

            <button
              type="submit"
              disabled={isPending}
              className="flex-1 min-h-10.5 font-matrix-small-caps-2
              text-3xl bg-button-purple rounded-md pb-1 text-white-text cursor-pointer
              hover:bg-[#4a1a6b] hover:brightness-110 transition-all duration-100
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
