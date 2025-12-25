'use client'

import { useState, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = ({ label, type, error, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-black">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={isPassword && showPassword ? 'text' : type}
          className="w-full h-11 px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              // Eye-off icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3.53 3.53L20.47 20.47M9.88 9.88A3.75 3.75 0 0012 15.75c.47 0 .92-.09 1.33-.25M6.62 6.62C4.68 7.88 3.28 9.66 2.25 12c0 0 3.75 7.5 9.75 7.5 1.65 0 3.18-.32 4.55-.9M14.78 9.22A3.75 3.75 0 0112 8.25c-2.07 0-3.75 1.68-3.75 3.75 0 .31.04.62.12.9" />
              </svg>
            ) : (
              // Eye icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
