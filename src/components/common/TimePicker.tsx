import { forwardRef, type InputHTMLAttributes } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface TimePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  loading?: boolean;
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ 
    label, 
    error, 
    helperText, 
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
          <input
            ref={ref}
            type="time"
            disabled={disabled || loading}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            className={`
              input input-bordered w-full transition-all duration-200 pr-10
              ${hasError ? 'input-error focus:border-error' : 'focus:border-primary'}
              ${loading ? 'opacity-60' : ''}
              ${className}
            `}
            {...props}
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {loading ? (
              <span className="loading loading-spinner loading-sm text-primary"></span>
            ) : hasError ? (
              <AlertCircle className="h-5 w-5 text-error" />
            ) : (
              <Clock className="h-5 w-5 text-base-content/40" />
            )}
          </div>
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

TimePicker.displayName = 'TimePicker';

export default TimePicker;
