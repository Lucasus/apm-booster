import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className
}) => {
  const baseStyles = 'font-sc2 font-bold rounded transition-all duration-200 glow-on-hover disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-sc2-blue text-white hover:bg-sc2-brightBlue shadow-sc2-glow',
    secondary: 'bg-sc2-gray-700 text-white hover:bg-sc2-gray-600',
    danger: 'bg-sc2-red text-white hover:bg-red-600'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
