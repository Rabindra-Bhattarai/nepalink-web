import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/lib/actions/auth-actions";
import { useState } from "react";

type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setServerSuccess(null);
    setLoading(true);

    try {
      const res = await handleLogin({
        email: data.email,
        password: data.password,
      });

      if (res.success) {
        setServerSuccess(res.message);

        const role = res.data?.role;

        setTimeout(() => {
          if (role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/user/dashboard");
          }
        }, 500);
      } else {
        setServerError(res.message);
      }
    } catch (err: any) {
      console.error("Axios error:", err.message);
      setServerError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  const goToSignup = () => {
    router.push("/register");
  };

  return { ...form, onSubmit, goToSignup, serverError, serverSuccess, loading };
};
