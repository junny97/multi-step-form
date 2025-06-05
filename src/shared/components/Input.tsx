import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className='w-full'>
        <label
          htmlFor={id}
          className='block text-sm font-medium mb-1 text-left'
        >
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          className={`input-field${
            error ? ' border-red-500 focus:ring-red-500' : ''
          }${className}`}
          {...props}
        />

        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

export default Input;
