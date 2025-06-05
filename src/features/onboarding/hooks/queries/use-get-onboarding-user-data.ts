import type { OnboardingUserResponse } from '../../onboarding.type';
import { getOnboardingUserById } from '../../onboarding.api';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@/shared/constants';

export const useGetOnboardingUserData = (userId: number) => {
  return useQuery<OnboardingUserResponse>({
    queryKey: ['user', userId],
    queryFn: () => getOnboardingUserById(userId),
    enabled: !!userId,
    staleTime: DEFAULT_STALE_TIME,
  });
};
