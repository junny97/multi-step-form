export const ONBOARDING_ERROR_MESSAGES = {
  NICKNAME: {
    MIN: '닉네임은 최소 2자 이상이어야 합니다',
    MAX: '닉네임은 최대 10자까지 가능합니다',
    PATTERN: '닉네임은 한글, 영문, 숫자만 가능합니다',
  },
  GENRE: {
    MIN: '최소 1개 이상의 장르를 선택해주세요',
    MAX: '최대 5개까지 선택 가능합니다',
  },
  FAVORITE: {
    REQUIRED: '작품 제목을 입력해주세요',
    MAX: '작품 제목은 최대 50자까지 가능합니다',
  },
  GENDER: {
    REQUIRED: '성별을 선택해주세요',
  },
} as const;

export const STEPS = ['nickname', 'gender', 'genres', 'favorite'] as const;

export const AVAILABLE_GENRES = [
  '액션',
  '코미디',
  '로맨스',
  '스릴러',
  '공포',
  'SF',
  '판타지',
  '드라마',
  '애니메이션',
  '다큐멘터리',
] as const;
