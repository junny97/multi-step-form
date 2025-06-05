import { useSearchParams, useNavigate } from 'react-router-dom';

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

  // URL에서 현재 스텝 추출 및 초기화
  const getCurrentStep = (): T[number] => {
    const urlStep = searchParams.get('step');

    if (urlStep && steps.includes(urlStep)) {
      return urlStep;
    }

    // URL에 유효한 step이 없으면 첫 번째 step으로 설정
    const firstStep = steps[0];
    const newParams = new URLSearchParams(searchParams);
    newParams.set('step', firstStep);
    navigate(`?${newParams.toString()}`, { replace: true });

    return firstStep;
  };

  const currentStep = getCurrentStep();
  const stepIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length;

  // STEP URL 업데이트 함수
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
