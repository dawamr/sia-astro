import { forwardRef, type InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    loading,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const hasError = !!error;
    
    return (
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className="label-text font-medium">{label}</span>
            {props.required && <span className="label-text-alt text-error">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled || loading}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            className={`
              input input-bordered w-full transition-all duration-200
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon || loading || hasError ? 'pr-10' : ''}
              ${hasError ? 'input-error focus:border-error' : 'focus:border-primary'}
              ${loading ? 'opacity-60' : ''}
              ${className}
            `}
            {...props}
          />
          
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="loading loading-spinner loading-sm text-primary"></span>
            </div>
          )}
          
          {!loading && hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-error">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
          
          {!loading && !hasError && rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <label className="label">
            {error ? (
              <span 
                id={`${props.id}-error`} 
                className="label-text-alt text-error flex items-center gap-1 animate-fadeIn"
                role="alert"
              >
                {error}
              </span>
            ) : (
              <span id={`${props.id}-helper`} className="label-text-alt text-base-content/60">
                {helperText}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
