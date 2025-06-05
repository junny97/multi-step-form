import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface UseFunnelProps<T extends readonly string[]> {
  steps: T;
}

interface UseFunnelReturn<T extends readonly string[]> {
  currentStep: T[number];
  goToStep: (step: T[number]) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  stepIndex: number;
  totalSteps: number;
}

export function useFunnel<T extends readonly string[]>({
  steps,
}: UseFunnelProps<T>): UseFunnelReturn<T> {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //  step 파라미터에 없는 값일 경우 첫 번째 스텝으로 초기 url 설정
  useEffect(() => {
    const urlStep = searchParams.get('step');
    if (!urlStep) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('step', steps[0]);
      navigate(`?${newParams.toString()}`, { replace: true });
    }
  }, [searchParams, steps, navigate]);

  // 현재 스텝 가져오기
  const getCurrentStep = (): T[number] => {
    const urlStep = searchParams.get('step');
    return urlStep && steps.includes(urlStep) ? urlStep : steps[0];
  };

  const currentStep = getCurrentStep();
  const stepIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length;

  // step url 업데이트 함수
  const updateUrl = (step: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('step', step);
    navigate(`?${newParams.toString()}`, { replace: false });
  };

  const goToStep = (step: T[number]) => {
    if (steps.includes(step)) {
      updateUrl(step);
    }
  };

  const goToNextStep = () => {
    const canGoNext = stepIndex < totalSteps - 1;
    if (canGoNext) {
      goToStep(steps[stepIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    const canGoPrev = stepIndex > 0;
    if (canGoPrev) {
      goToStep(steps[stepIndex - 1]);
    }
  };

  return {
    currentStep,
    goToStep,
    goToNextStep,
    goToPrevStep,
    stepIndex,
    totalSteps,
  };
}
