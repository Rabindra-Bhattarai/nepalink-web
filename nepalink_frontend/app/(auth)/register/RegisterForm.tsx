"use client";

import Link from "next/link";
import { Input } from "../_components/ui/Input";
import { Button } from "../_components/ui/Button";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { Loader2, UserPlus, ShieldCheck } from "lucide-react";

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
    <div className="w-full antialiased">
      

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
              Full Legal Name
            </label>
            <Input 
              label={""} type="text"
              placeholder="Rabindra Bhattarai"
              {...register("name")}
              error={errors.name?.message}
              className="h-11 border-slate-200 rounded-xl text-slate-900! focus:border-sky-500 transition-all font-normal"            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
              Email Address
            </label>
            <Input 
              label={""} type="email"
              placeholder="abc@nepalink.com"
              {...register("email")}
              error={errors.email?.message}
              className="h-11 border-slate-200 rounded-xl text-slate-900! focus:border-sky-500 transition-all font-normal"            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
            Contact Number
          </label>
          <Input 
            label={""} type="text"
            placeholder="98XXXXXXXX"
            {...register("phone")}
            error={errors.phone?.message}
            className="h-11 border-slate-200 rounded-xl text-slate-900! focus:border-sky-500 transition-all font-normal"          />
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
              Create Password
            </label>
            <Input 
              label={""} type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
              className="h-11 border-slate-200 rounded-xl text-slate-900! focus:border-sky-500 transition-all font-normal"            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
              Confirm Password
            </label>
            <Input 
              label={""} type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              className="h-11 border-slate-200 rounded-xl text-slate-900! focus:border-sky-500 transition-all font-normal"            />
          </div>
        </div>

        {/* Error/Success Messages */}
        {serverError && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-100 animate-in fade-in zoom-in-95">
            {serverError}
          </div>
        )}
        {serverSuccess && (
          <div className="p-3 rounded-xl bg-green-50 text-green-700 text-xs font-medium border border-green-100 animate-in fade-in zoom-in-95">
            {serverSuccess}
          </div>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white! rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-100"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <UserPlus size={18} />
                <span>Create Professional Account</span>
              </>
            )}
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-normal">
            Already have an account?{" "}
            <Link href="/login" className="text-sky-600 font-bold hover:underline transition-all">
              Sign In here
            </Link>
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-medium uppercase tracking-widest">Secure Registration</span>
          </div>
        </div>
      </form>
    </div>
  );
};