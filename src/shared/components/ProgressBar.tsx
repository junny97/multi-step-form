interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  className,
}: ProgressBarProps) {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={`max-w-md mx-auto mb-6${className ? ` ${className}` : ''}`}>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-sm font-medium text-gray-700'>
          {currentStep} / {totalSteps}
        </span>
        <span className='text-sm text-gray-500'>{progressPercentage}%</span>
      </div>

      <div className='w-full bg-gray-200 rounded-full h-2'>
        <div
          className='bg-blue-600 h-2 rounded-full transition-all duration-300'
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
