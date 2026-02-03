import { InputHTMLAttributes, forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium mb-1 text-black">{label}</label>
        <div className="relative">
          <input
            ref={ref}
            {...props}
            type={isPassword && showPassword ? "text" : type}
            className={clsx(
              "border border-gray-400 rounded-md px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
              error && "border-red-500 focus:ring-red-500"
            )}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-600 hover:text-blue-600"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
