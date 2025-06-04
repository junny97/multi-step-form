import { z } from 'zod';
import { ONBOARDING_ERROR_MESSAGES } from './onboarding.constant';

export type OnboardingStep = 'nickname' | 'gender' | 'genres' | 'favorite';

export const GenderSchema = z.enum(['남성', '여성']);
export type Gender = z.infer<typeof GenderSchema>;

export const NicknameStepSchema = z.object({
  nickname: z
    .string()
    .min(2, ONBOARDING_ERROR_MESSAGES.NICKNAME.MIN)
    .max(10, ONBOARDING_ERROR_MESSAGES.NICKNAME.MAX)
    .regex(/^[가-힣a-zA-Z0-9]+$/, ONBOARDING_ERROR_MESSAGES.NICKNAME.PATTERN),
});

export const GenderStepSchema = z.object({
  gender: GenderSchema,
});

export const GenresStepSchema = z.object({
  genre: z
    .array(z.string())
    .min(1, ONBOARDING_ERROR_MESSAGES.GENRE.MIN)
    .max(5, ONBOARDING_ERROR_MESSAGES.GENRE.MAX),
});

export const FavoriteStepSchema = z.object({
  favorite_movie: z
    .string()
    .min(1, ONBOARDING_ERROR_MESSAGES.FAVORITE.REQUIRED)
    .max(50, ONBOARDING_ERROR_MESSAGES.FAVORITE.MAX),
});

export const OnboardingDataSchema = z.object({
  nickname: NicknameStepSchema.shape.nickname,
  gender: GenderStepSchema.shape.gender,
  genre: GenresStepSchema.shape.genre,
  favorite_movie: FavoriteStepSchema.shape.favorite_movie,
});

export const OnboardingUserResponseSchema = OnboardingDataSchema.extend({
  id: z.number(),
});

export type OnboardingData = z.infer<typeof OnboardingDataSchema>;
export type OnboardingUserResponse = z.infer<
  typeof OnboardingUserResponseSchema
>;
export type NicknameFormData = z.infer<typeof NicknameStepSchema>;
export type GenderFormData = z.infer<typeof GenderStepSchema>;
export type GenresFormData = z.infer<typeof GenresStepSchema>;
export type FavoriteFormData = z.infer<typeof FavoriteStepSchema>;
