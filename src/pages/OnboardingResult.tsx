import { useGetOnboardingUserData } from '@/features/onboarding/hooks/queries/use-get-onboarding-user-data';
import { useLocation, Link } from 'react-router-dom';

export default function OnboardingResultPage() {
  const location = useLocation();

  const state = location.state;
  const userId = state?.userId;

  const {
    data: user,
    isLoading,
    isError,

    refetch,
  } = useGetOnboardingUserData(userId!);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='max-w-md mx-auto'>
          <div className='card text-center'>
            <svg
              className='w-16 h-16 text-red-500 mx-auto mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <h2 className='text-2xl font-bold mb-2 text-red-600'>오류 발생</h2>
            <p className='text-gray-600 mb-6'>
              '사용자 정보를 불러오는데 실패했습니다.'
            </p>
            <div className='flex gap-3 justify-center'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => refetch()}
              >
                다시 시도
              </button>
              <Link to='/onboarding' className='btn btn-primary'>
                온보딩으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-md mx-auto'>
          {/* 성공 아이콘 */}
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
              온보딩 완료!
            </h1>
            <p className='text-gray-600'>환영합니다, {user.nickname}님!</p>
          </div>

          <div className='card'>
            <h2 className='text-lg font-semibold mb-4'>입력하신 정보</h2>

            <div className='space-y-4'>
              <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                <span className='text-sm font-medium text-gray-700'>
                  사용자 ID
                </span>
                <span className='text-sm text-gray-900'>#{user.id}</span>
              </div>

              <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                <span className='text-sm font-medium text-gray-700'>
                  닉네임
                </span>
                <span className='text-sm text-gray-900'>{user.nickname}</span>
              </div>

              <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                <span className='text-sm font-medium text-gray-700'>성별</span>
                <span className='text-sm text-gray-900'>{user.gender}</span>
              </div>

              <div className='py-2 border-b border-gray-100'>
                <div className='flex justify-between items-start mb-2'>
                  <span className='text-sm font-medium text-gray-700'>
                    관심 장르
                  </span>
                  <span className='text-xs text-gray-500'>
                    {user.genre.length}개 선택
                  </span>
                </div>
                <div className='flex flex-wrap gap-1'>
                  {user.genre.map((genre, index) => (
                    <span
                      key={index}
                      className='inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex justify-between items-center py-2'>
                <span className='text-sm font-medium text-gray-700'>
                  좋아하는 작품
                </span>
                <span className='text-sm text-gray-900 text-right max-w-40 truncate'>
                  {user.favorite_movie}
                </span>
              </div>
            </div>
          </div>

          <div className='mt-8 space-y-3'>
            <Link
              to='/onboarding'
              className='w-full btn btn-secondary text-center block'
            >
              다시 시작하기
            </Link>
          </div>

          <div className='mt-8 text-center'>
            <p className='text-xs text-gray-500'>
              입력하신 정보는 언제든지 프로필 설정에서 수정하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
