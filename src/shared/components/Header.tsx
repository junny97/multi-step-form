import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export default function Header({ children, className = '' }: HeaderProps) {
  return <h2 className={`text-xl font-bold mb-6${className}`}>{children}</h2>;
}
