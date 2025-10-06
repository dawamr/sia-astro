import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  loading?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    loading,
    showCount,
    maxLength,
    className = '',
    disabled,
    value,
    ...props 
  }, ref) => {
    const hasError = !!error;
    const currentLength = typeof value === 'string' ? value.length : 0;
    
    return (
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className="label-text font-medium">{label}</span>
            {props.required && <span className="label-text-alt text-error">*</span>}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={ref}
            disabled={disabled || loading}
            maxLength={maxLength}
            value={value}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            className={`
              textarea textarea-bordered w-full transition-all duration-200 resize-y
              ${hasError ? 'textarea-error focus:border-error' : 'focus:border-primary'}
              ${loading ? 'opacity-60' : ''}
              ${className}
            `}
            {...props}
          />
          
          {loading && (
            <div className="absolute right-3 top-3">
              <span className="loading loading-spinner loading-sm text-primary"></span>
            </div>
          )}
        </div>
        
        {(error || helperText || showCount) && (
          <label className="label">
            {error ? (
              <span 
                id={`${props.id}-error`} 
                className="label-text-alt text-error flex items-center gap-1 animate-fadeIn"
                role="alert"
              >
                <AlertCircle className="h-3 w-3" />
                {error}
              </span>
            ) : (
              <span id={`${props.id}-helper`} className="label-text-alt text-base-content/60">
                {helperText}
              </span>
            )}
            
            {showCount && maxLength && (
              <span className={`label-text-alt ${currentLength >= maxLength ? 'text-error' : 'text-base-content/60'}`}>
                {currentLength}/{maxLength}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
