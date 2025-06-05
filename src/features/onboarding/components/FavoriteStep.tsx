import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FavoriteStepSchema,
  type FavoriteFormData,
  type OnboardingData,
} from '../onboarding.type';
import Button from '@/shared/components/Button';
import Header from '@/shared/components/Header';
import Input from '@/shared/components/Input';

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
      <Header>좋아하는 작품을 알려주세요</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <Input
            id='favorite_movie'
            label='작품 제목'
            placeholder='좋아하는 작품 제목을 입력해주세요'
            error={errors.favorite_movie?.message}
            {...register('favorite_movie')}
          />
        </div>

        <div className='flex justify-between'>
          <Button
            type='button'
            variant='secondary'
            onClick={onPrev}
            disabled={isSubmitting}
          >
            이전
          </Button>
          <Button
            type='submit'
            variant={isSubmitting || !isValid ? 'disabled' : 'primary'}
            disabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
          >
            완료
          </Button>
        </div>
      </form>
    </div>
  );
}
