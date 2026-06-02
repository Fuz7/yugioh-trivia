import logo from "@images/Logo.png";
import { Mail, LockKeyhole, SquareUser } from "lucide-react";
import { cn } from "../../../utils/clsx";
import { formInputStyling } from "../../../utils/styling";
import { Checkbox } from "../../../ui/Checkbox";

function Register() {
  return (
    <div className="w-full min-h-full flex justify-center items-center text-white">
      <RegisterForm />
    </div>
  );
}

function RegisterForm() {
  return (
    <div
      className="flex-1 max-w-107.5 min-h-141.5 bg-card 
    border-[#4d4d4d] border rounded-sm relative py-9 px-13
    flex flex-col items-center"
    >
      <span
        className="w-34 h-0.75 bg-[#868686] 
      absolute top-0 left-1/2 -translate-x-1/2
       rounded-b-sm "
      />
      <div className="flex flex-col items-center">
        <img src={logo} />
        <h1 className="text-2xl font-matrixIIBold leading-7 ">
          Yu-Gi-Oh! Trivia!
        </h1>
        <p className="text-tertiary text-sm font-suiss-semi-bold">
          Test your dueling knowledge!
        </p>
      </div>
      <div className="mt-8 flex flex-col w-full">
        <p className="font-suiss-medium text-xl text-white-text">
          Begin Your Journey, Duelist
        </p>
        <form className="mt-4 flex flex-col w-full" action="">
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
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="w-full min-h-10 relative mt-1">
            <SquareUser
              className="absolute top-1/2 -translate-y-1/2 left-3 w-4.5 h-4.5"
              color="#919191"
            />
            <input
              id="username"
              name="username"
              autoComplete="username"
              className={cn(formInputStyling)}
              type="text"
              placeholder="Username"
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
              autoComplete="new-password"
              className={cn(formInputStyling)}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="w-full min-h-10 relative mt-1">
            <LockKeyhole
              className="absolute top-1/2 -translate-y-1/2 left-3 w-4.5 h-4.5"
              color="#919191"
            />
            <input
              id="confirm_password"
              name="confirm_password"
              autoComplete="current-password"
              className={cn(formInputStyling)}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="mt-4.5 flex gap-2 items-center">
            <a
              href="/login"
              className="font-suiss-regular  text-xs text-[#dedede] hover:underline cursor-pointer"
            >
              Already have an account?
            </a>
          </div>
          <div className="mt-4 gap-4 flex">
            <button
              className="flex-1 min-h-10.5 font-matrix-small-caps-2
            text-3xl bg-button-purple rounded-md pb-1 text-white-text cursor-pointer
            hover:bg-[#4a1a6b] hover:brightness-110 transition-all duration-100"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
