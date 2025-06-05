import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FavoriteStepSchema,
  type FavoriteFormData,
  type OnboardingData,
} from '../onboarding.type';

interface FavoriteStepProps {
  data: OnboardingData;
  onPrev: () => void;
  onComplete: (finalData: OnboardingData) => void;
  isSubmitting?: boolean;
}

export default function FavoriteStep({
  data,
  onPrev,
  onComplete,
  isSubmitting = false,
}: FavoriteStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FavoriteFormData>({
    resolver: zodResolver(FavoriteStepSchema),
    defaultValues: {
      favorite_movie: data.favorite_movie || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (formData: FavoriteFormData) => {
    const finalData: OnboardingData = {
      nickname: data.nickname,
      gender: data.gender,
      genre: data.genre,
      favorite_movie: formData.favorite_movie,
    };

    // OnboardingPage의 handleFinalSubmit로 최종 데이터 전달
    onComplete(finalData);
  };

  return (
    <div className='card max-w-md mx-auto mt-10'>
      <h2 className='text-2xl font-bold mb-6'>좋아하는 작품을 알려주세요</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <label
            htmlFor='favorite_movie'
            className='block text-sm font-medium mb-1'
          >
            작품 제목
          </label>
          <input
            id='favorite_movie'
            className='input-field'
            placeholder='좋아하는 작품 제목을 입력해주세요'
            {...register('favorite_movie')}
          />
          {errors.favorite_movie && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.favorite_movie.message}
            </p>
          )}
        </div>

        <div className='flex justify-between'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={onPrev}
            disabled={isSubmitting}
          >
            이전
          </button>
          <button
            type='submit'
            className={`btn ${
              isSubmitting
                ? 'btn-disabled'
                : isValid
                ? 'btn-primary'
                : 'btn-disabled'
            }`}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? '제출 중...' : '완료'}
          </button>
        </div>
      </form>
    </div>
  );
}
