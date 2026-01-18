"use client";

import Link from "next/link";
import { Input } from "../_components/ui/Input";
import { Button } from "../_components/ui/Button";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    serverError,
    serverSuccess,
    loading,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input label="Full Name" type="text" {...register("name")} error={errors.name?.message} />
      <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
      <Input label="Phone Number" type="text" {...register("phone")} error={errors.phone?.message} />
      <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
      <Input label="Confirm Password" type="password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      {serverSuccess && <p className="text-green-600 text-sm">{serverSuccess}</p>}

      <Button
        type="submit"
        className="w-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
};
