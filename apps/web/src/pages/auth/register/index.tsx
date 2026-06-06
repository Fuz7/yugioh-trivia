import { useState } from "react";
import logo from "@images/Logo.png";
import { Mail, LockKeyhole, SquareUser, EyeOff, Eye } from "lucide-react";
import { cn } from "../../../utils/clsx";
import { formInputStyling } from "../../../utils/styling";
import { registerUser } from "../../../lib/api/auth";
import useAuth from "../../../hooks/auth";

type FormState = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  return (
    <div className="w-full min-h-full flex justify-center items-center text-white">
      <RegisterForm />
    </div>
  );
}

function RegisterForm() {
  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { error, isPending, register } = useAuth();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    register(form);
  }

  return (
    <div className="flex-1 max-w-107.5 min-h-141.5 bg-card border-[#4d4d4d] border rounded-sm relative py-9 px-13 flex flex-col items-center">
      <span className="w-34 h-0.75 bg-[#868686] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-sm" />

      {/* Header */}
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
      <div className="mt-8 flex flex-col w-full">
        <p className="font-suiss-medium text-xl text-white-text">
          Begin Your Journey, Duelist
        </p>

        <form
          action={"POST"}
          className="mt-4 flex flex-col w-full"
          onSubmit={handleSubmit}
        >
          {/* EMAIL */}
          <div className="w-full min-h-10 relative">
            <Mail
              className="absolute top-1/2 -translate-y-1/2 left-3 w-4.5 h-4.5"
              color="#919191"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={cn(formInputStyling)}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          {/* USERNAME */}
          <div className="w-full min-h-10 relative mt-1">
            <SquareUser
              className="absolute top-1/2 -translate-y-1/2 left-3 w-4.5 h-4.5"
              color="#919191"
            />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={cn(formInputStyling)}
              type="text"
              placeholder="Username"
              required
            />
          </div>

          <div className="w-full min-h-10 relative mt-1">
            <LockKeyhole
              className="absolute top-1/2 -translate-y-1/2 left-3 w-4.5 h-4.5"
              color="#919191"
            />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className={cn(formInputStyling)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              min={8}
              required
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

          <div className="w-full min-h-10 relative mt-1">
            <LockKeyhole
              className="absolute top-1/2 -translate-y-1/2 left-3 w-4.5 h-4.5"
              color="#919191"
            />
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={cn(formInputStyling)}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              min={8}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-icon
    hover:text-white transition-colors duration-100 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4.5 h-4.5" />
              ) : (
                <Eye className="w-4.5 h-4.5" />
              )}
            </button>
          </div>

          <div className="mt-4.5 flex gap-2 items-center">
            <a
              href="/login"
              className="font-suiss-regular text-xs text-[#dedede] hover:underline cursor-pointer"
            >
              Already have an account?
            </a>
          </div>

          <div className="mt-4 gap-4 flex">
            <button
              disabled={isPending}
              className="flex-1 min-h-10.5 font-matrix-small-caps-2 text-3xl bg-button-purple rounded-md pb-1 text-white-text cursor-pointer hover:bg-[#4a1a6b] hover:brightness-110 transition-all duration-100 disabled:opacity-50"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
