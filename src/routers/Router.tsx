import OnboardingPage from '@/pages/OnboardingPage';
import OnboardingResultPage from '@/pages/OnboardingResult';
import OnboardingResultGuard from '@/shared/guards/OnboardingResultGuard';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/onboarding' replace />} />
      <Route path='/onboarding' element={<OnboardingPage />} />
      <Route
        path='/onboarding/result'
        element={
          <OnboardingResultGuard fallbackPath='/onboarding'>
            <OnboardingResultPage />
          </OnboardingResultGuard>
        }
      />
    </Routes>
  );
}
