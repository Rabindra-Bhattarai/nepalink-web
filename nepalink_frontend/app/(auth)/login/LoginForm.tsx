"use client";

import { Input } from "../_components/ui/Input";
import { Button } from "../_components/ui/Button";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    goToSignup,
    serverError,
    serverSuccess,
    loading,
  } = useLoginForm();

  return (
    <div className="w-full antialiased">
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-normal text-slate-900 tracking-tight">Staff Login</h2>
        <p className="text-slate-500 mt-2 font-normal">Secure access to the healthcare portal</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
          Email Address
          </label>
          <Input
            label={""} type="email"
            placeholder="abc@nepalink.com"
            {...register("email")}
            error={errors.email?.message}
            className="h-12 border-slate-200 rounded-xl text-slate-900! focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all font-normal"          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 px-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Access Password
            </label>
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-[11px] font-bold text-sky-600 hover:text-sky-700 tracking-widest uppercase transition-colors"
            >
              Reset?
            </button>
          </div>
          <Input
            label={""} type="password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
            className="h-12 border-slate-200 rounded-xl text-slate-900! focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all font-normal"          />
        </div>

        {/* Server Messaging */}
        {serverError && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-100 animate-in fade-in slide-in-from-top-1">
            {serverError}
          </div>
        )}
        {serverSuccess && (
          <div className="p-3 rounded-xl bg-green-50 text-green-700 text-xs font-medium border border-green-100 animate-in fade-in slide-in-from-top-1">
            {serverSuccess}
          </div>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white! rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-100 active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn size={18} />
                <span>Enter Dashboard</span>
              </>
            )}
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-normal">
            New to the network?{" "}
            <button
              type="button"
              onClick={goToSignup}
              className="text-sky-600 font-bold hover:underline transition-all"
            >
              Create an Account
            </button>
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-300">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">SSL Encrypted</span>
          </div>
        </div>
      </form>
    </div>
  );
};