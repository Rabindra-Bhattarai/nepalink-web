import { ButtonHTMLAttributes } from 'react'

export const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
  >
    {children}
  </button>
)
