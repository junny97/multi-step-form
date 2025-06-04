import axios from 'axios';
import type { OnboardingData, OnboardingUserResponse } from './onboarding.type';

const axiosInstance = axios.create({
  baseURL: 'https://onboarding-server-idpj.onrender.com/api',
});

export const postOnboardingData = async (
  data: OnboardingData
): Promise<OnboardingUserResponse> => {
  const response = await axiosInstance.post<OnboardingUserResponse>(
    '/users/onboarding',
    data
  );

  return response.data;
};

export const getOnboardingUserById = async (
  userId: number
): Promise<OnboardingUserResponse> => {
  const response = await axiosInstance.get<OnboardingUserResponse>(
    `/users/${userId}`
  );

  return response.data;
};
