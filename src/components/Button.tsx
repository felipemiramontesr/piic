import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  className?: string;
  href?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  href,
  fullWidth = false,
}) => {
  const baseClass = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
