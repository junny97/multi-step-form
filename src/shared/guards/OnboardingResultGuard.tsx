import { type ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface OnboardingResultGuardProps {
  children: ReactNode;
  fallbackPath?: string;
}

export default function OnboardingResultGuard({
  children,
  fallbackPath,
}: OnboardingResultGuardProps) {
  const location = useLocation();
  const userId = location.state?.userId;

  return !userId ? (
    <Navigate to={fallbackPath || '/onboarding'} replace />
  ) : (
    <>{children}</>
  );
}
