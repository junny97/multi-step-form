import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  NicknameStepSchema,
  type NicknameFormData,
  type OnboardingData,
} from '../onboarding.type';
import Button from '@/shared/components/Button';
import Header from '@/shared/components/Header';
import Input from '@/shared/components/Input';

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
      <Header>닉네임을 입력해주세요</Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <Input
            id='nickname'
            label='닉네임'
            placeholder='닉네임을 입력해주세요'
            error={errors.nickname?.message}
            {...register('nickname')}
          />
        </div>

        <div className='flex justify-end'>
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
