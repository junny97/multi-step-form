import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'disabled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  children,
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading || variant === 'disabled';

  const getButtonClass = () => {
    if (isDisabled) return 'btn btn-disabled';
    if (variant === 'secondary') return 'btn btn-secondary';
    return 'btn btn-primary';
  };

  return (
    <button
      className={`${getButtonClass()}${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
}
