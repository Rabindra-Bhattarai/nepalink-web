import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export const Button = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={clsx(
        'bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors',
        className
      )}
    >
      {children}
    </button>
  )
}