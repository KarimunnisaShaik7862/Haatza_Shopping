import React from 'react';

interface HaatzaLiteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const HaatzaLiteButton: React.FC<HaatzaLiteButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size];

  const variantStyles = {
    primary: 'bg-[#238636] hover:bg-[#1c6d2c] text-white shadow-sm hover:shadow',
    secondary: 'bg-[#EAF6EC] hover:bg-[#d8edd9] text-[#238636]',
    outline: 'border border-[#238636] text-[#238636] hover:bg-[#EAF6EC]',
    ghost: 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
