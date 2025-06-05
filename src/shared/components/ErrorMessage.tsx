interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className = '3',
}: ErrorMessageProps) {
  if (!message) return null;

  return <p className={`text-red-500 text-sm mt-1${className}`}>{message}</p>;
}
