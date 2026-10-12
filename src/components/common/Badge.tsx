import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'outline' | 'discount';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
  size = 'md',
}) => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-md uppercase tracking-wider transition-colors';
  
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  const variantClasses = {
    primary: 'bg-[#F5DCDC] text-[#A60000] border border-[#D99A9A]/40 font-bold',
    secondary: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    outline: 'bg-transparent text-[#A60000] border border-[#D99A9A]',
    discount: 'bg-[#A60000] text-white shadow-xs font-black',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
