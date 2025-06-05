import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  NicknameStepSchema,
  type NicknameFormData,
  type OnboardingData,
} from '../onboarding.type';

interface NicknameStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
}

export default function NicknameStep({ data, onNext }: NicknameStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(NicknameStepSchema),
    defaultValues: {
      nickname: data.nickname || '',
    },
    mode: 'onChange',
  });

  const onSubmit = (formData: NicknameFormData) => {
    onNext({ nickname: formData.nickname });
  };

  return (
    <div className='card max-w-md mx-auto mt-10'>
      <h2 className='text-2xl font-bold mb-6'>닉네임을 입력해주세요</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <label htmlFor='nickname' className='block text-sm font-medium mb-1'>
            닉네임
          </label>
          <input
            id='nickname'
            className='input-field'
            placeholder='닉네임을 입력해주세요'
            {...register('nickname')}
          />
          {errors.nickname && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.nickname.message}
            </p>
          )}
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className={`btn ${isValid ? 'btn-primary' : 'btn-disabled'}`}
            disabled={!isValid}
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}
