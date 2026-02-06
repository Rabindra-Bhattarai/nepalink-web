import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema"
import { z } from "zod"
import { useState } from "react"
import { handleForgotPassword } from "@/lib/actions/forgot-actions"

type ForgotFormData = z.infer<typeof forgotPasswordSchema>

export const useForgotPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null)
  const [serverSuccess, setServerSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: ForgotFormData) => {
    setServerError(null)
    setServerSuccess(null)
    setLoading(true)

    try {
      const res = await handleForgotPassword(data)
      if (res.success) {
        setServerSuccess(res.message)
      } else {
        setServerError(res.message)
      }
    } catch (err: any) {
      setServerError(err.message || "Something went wrong")
    }

    setLoading(false)
  }

  return { ...form, onSubmit, serverError, serverSuccess, loading }
}
