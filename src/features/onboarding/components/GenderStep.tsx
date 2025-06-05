import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GenderStepSchema,
  type GenderFormData,
  type OnboardingData,
} from '../onboarding.type';
import Button from '@/shared/components/Button';
import Header from '@/shared/components/Header';
import ErrorMessage from '@/shared/components/ErrorMessage';

interface GenderStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrev: () => void;
}

export default function GenderStep({ data, onNext, onPrev }: GenderStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
  } = useForm<GenderFormData>({
    resolver: zodResolver(GenderStepSchema),
    defaultValues: {
      gender: data.gender,
    },
    mode: 'onChange',
  });

  const selectedGender = watch('gender');

  const onSubmit = (formData: GenderFormData) => {
    onNext({ gender: formData.gender });
  };

  return (
    <div className='card max-w-md mx-auto mt-10'>
      <Header>성별을 선택해주세요</Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <div className='flex space-x-4'>
            <label
              className={`flex-1 border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                selectedGender === '남성'
                  ? 'bg-blue-100 border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type='radio'
                value='남성'
                className='sr-only'
                {...register('gender')}
              />
              남성
            </label>

            <label
              className={`flex-1 border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                selectedGender === '여성'
                  ? 'bg-pink-100 border-pink-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type='radio'
                value='여성'
                className='sr-only'
                {...register('gender')}
              />
              여성
            </label>
          </div>
          {errors.gender && (
            <ErrorMessage message={errors.gender.message || ''} />
          )}
        </div>

        <div className='flex justify-between'>
          <Button type='button' variant='secondary' onClick={onPrev}>
            이전
          </Button>
          <Button
            type='submit'
            variant={isValid ? 'primary' : 'disabled'}
            disabled={!isValid}
          >
            다음
          </Button>
        </div>
      </form>
    </div>
  );
}
