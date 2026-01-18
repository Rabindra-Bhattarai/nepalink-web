import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/lib/actions/auth-actions";
import { useState } from "react";

type RegisterFormData = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    setServerSuccess(null);
    setLoading(true);

    try {
      const res = await handleRegister({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
   console.log(res);
      if (res.success) {
        setServerSuccess(res.message);
        setTimeout(() => router.push("/login"), 1500);
      } else {
        console.log(res);
        setServerError(res.message);
      }
    } catch (err: any) {
      console.error("Axios error:", err.message);
      setServerError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return { ...form, onSubmit, serverError, serverSuccess, loading };
};
