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
  const baseStyles = 'inline-flex items-center justify-center font-extrabold rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  }[size];

  const variantStyles = {
    primary: 'bg-[#0C831F] hover:bg-[#09711A] text-white shadow-[0_3px_12px_rgba(12,131,31,0.25)] hover:shadow-[0_6px_20px_rgba(12,131,31,0.35)] hover:-translate-y-0.5 border border-[#0C831F]',
    secondary: 'bg-[#EAF8ED] hover:bg-[#D8F2DD] text-[#0C831F] border border-[#CBEAD2]',
    outline: 'border border-[#0C831F] text-[#0C831F] hover:bg-[#EAF8ED]',
    ghost: 'text-[#111D15] hover:bg-[#F2FBF4] hover:text-[#0C831F]',
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
