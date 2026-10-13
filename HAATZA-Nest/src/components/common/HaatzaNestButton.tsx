import React from 'react';

interface HaatzaNestButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const HaatzaNestButton: React.FC<HaatzaNestButtonProps> = ({
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
    primary: 'bg-[#6C3FC5] hover:bg-[#572fa8] text-white shadow-sm hover:shadow',
    secondary: 'bg-[#F2ECFC] hover:bg-[#e4d7f9] text-[#6C3FC5]',
    outline: 'border border-[#6C3FC5] text-[#6C3FC5] hover:bg-[#F2ECFC]',
    yellow: 'bg-[#FFD54F] hover:bg-[#ffca28] text-zinc-900 shadow-sm font-black',
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
