import Funnel from '@/features/funnel/Funnel';
import { useFunnel } from '@/features/funnel/use-funnel';
import FavoriteStep from '@/features/onboarding/components/FavoriteStep';
import GenderStep from '@/features/onboarding/components/GenderStep';
import GenresStep from '@/features/onboarding/components/GenresStep';
import NicknameStep from '@/features/onboarding/components/NicknameStep';
import { usePostOnboardingData } from '@/features/onboarding/hooks/mutations/use-post-onboarding-data';
import { STEPS } from '@/features/onboarding/onboarding.constant';
import type {
  OnboardingData,
  OnboardingUserResponse,
} from '@/features/onboarding/onboarding.type';
import ProgressBar from '@/shared/components/ProgressBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const onboardingMutation = usePostOnboardingData();

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    nickname: '',
    gender: '남성',
    genre: [],
    favorite_movie: '',
  });

  const { currentStep, stepIndex, totalSteps, goToNextStep, goToPrevStep } =
    useFunnel({
      steps: STEPS,
    });

  const handleStepComplete = (newData: Partial<OnboardingData>) => {
    setOnboardingData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    goToNextStep();
  };

  // 최종 제출 처리
  const handleFinalSubmit = (finalData: OnboardingData) => {
    onboardingMutation.mutate(finalData, {
      onSuccess: (user: OnboardingUserResponse) => {
        navigate('/onboarding/result', {
          state: { userId: user.id },
          replace: true,
        });
      },
      onError: (error: Error) => {
        console.error('온보딩 제출 에러:', error);
      },
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      {/* 프로그레스 바 */}
      <ProgressBar currentStep={stepIndex + 1} totalSteps={totalSteps} />

      <Funnel step={currentStep}>
        <Funnel.Step name='nickname'>
          <NicknameStep data={onboardingData} onNext={handleStepComplete} />
        </Funnel.Step>

        <Funnel.Step name='gender'>
          <GenderStep
            data={onboardingData}
            onNext={handleStepComplete}
            onPrev={goToPrevStep}
          />
        </Funnel.Step>

        <Funnel.Step name='genres'>
          <GenresStep
            data={onboardingData}
            onNext={handleStepComplete}
            onPrev={goToPrevStep}
          />
        </Funnel.Step>

        <Funnel.Step name='favorite'>
          <FavoriteStep
            data={onboardingData}
            onPrev={goToPrevStep}
            onComplete={handleFinalSubmit}
            isSubmitting={onboardingMutation.isPending}
          />
        </Funnel.Step>
      </Funnel>
    </div>
  );
}
