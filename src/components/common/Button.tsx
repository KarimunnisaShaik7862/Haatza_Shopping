import React from 'react';
import { cn } from '../../utils/formatters';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 rounded-xl disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none font-heading';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-6 py-3.5 gap-2.5 rounded-2xl',
  };

  const variantStyles = {
    primary: 'bg-[#2962FF] hover:bg-[#1E4ED8] text-white shadow-soft-sm hover:shadow-soft active:scale-[0.98]',
    secondary: 'bg-[#EEF3FF] hover:bg-[#DBEAFE] text-[#2962FF] active:scale-[0.98]',
    outline: 'bg-white hover:bg-[#F5F7FF] text-[#172033] border border-[#E5EAF3] hover:border-[#2962FF]/40 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-[#EEF3FF] text-[#172033] hover:text-[#2962FF]',
    soft: 'bg-white/80 hover:bg-white text-[#172033] backdrop-blur-xs border border-white/20 shadow-2xs',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};
