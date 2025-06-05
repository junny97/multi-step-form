import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GenresStepSchema,
  type GenresFormData,
  type OnboardingData,
} from '../onboarding.type';
import { AVAILABLE_GENRES } from '../onboarding.constant';
import Button from '@/shared/components/Button';
import Header from '@/shared/components/Header';
import ErrorMessage from '@/shared/components/ErrorMessage';

interface GenresStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrev: () => void;
}

export default function GenresStep({ data, onNext, onPrev }: GenresStepProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    data.genre || []
  );

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GenresFormData>({
    resolver: zodResolver(GenresStepSchema),
    defaultValues: {
      genre: data.genre || [],
    },
    mode: 'onChange',
  });

  // 폼 초기화 시 유효성 검사 실행
  React.useEffect(() => {
    setValue('genre', selectedGenres, { shouldValidate: true });
  }, [selectedGenres, setValue]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  const onSubmit = (formData: GenresFormData) => {
    onNext({ genre: formData.genre });
  };

  return (
    <div className='card max-w-md mx-auto mt-10'>
      <Header>관심 장르를 선택해주세요</Header>
      <p className='text-gray-600 mb-4'>1개 이상 5개 이하로 선택해주세요</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <div className='flex flex-wrap gap-2'>
            {AVAILABLE_GENRES.map((genre) => (
              <button
                key={genre}
                type='button'
                className={`px-3 py-2 rounded-full text-sm transition-colors ${
                  selectedGenres.includes(genre)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
          {errors.genre && (
            <ErrorMessage message={errors.genre.message || ''} />
          )}
        </div>

        <div className='flex justify-between'>
          <Button type='button' variant='secondary' onClick={onPrev}>
            이전
          </Button>
          <Button
            type='submit'
            variant={
              selectedGenres.length > 0 && selectedGenres.length <= 5
                ? 'primary'
                : 'disabled'
            }
            disabled={selectedGenres.length === 0 || selectedGenres.length > 5}
          >
            다음
          </Button>
        </div>
      </form>
    </div>
  );
}
