import { postOnboardingData } from '@/features/onboarding/onboarding.api';
import {
  OnboardingDataSchema,
  type OnboardingData,
  type OnboardingUserResponse,
} from '@/features/onboarding/onboarding.type';
import { useMutation } from '@tanstack/react-query';

export const usePostOnboardingData = () => {
  return useMutation<OnboardingUserResponse, Error, OnboardingData>({
    mutationFn: async (data: OnboardingData) => {
      const result = OnboardingDataSchema.safeParse(data);

      if (!result.success) {
        const errorResult = result.error.issues[0];
        const message =
          errorResult?.message || '입력 데이터가 올바르지 않습니다.';
        throw new Error(message);
      }

      return await postOnboardingData(result.data);
    },
  });
};
