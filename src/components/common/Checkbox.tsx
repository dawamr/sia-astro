import { forwardRef, type InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label, 
    error, 
    helperText,
    indeterminate,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const hasError = !!error;
    
    return (
      <div className="form-control">
        <label className={`label cursor-pointer justify-start gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            className={`
              checkbox transition-all duration-200
              ${hasError ? 'checkbox-error' : 'checkbox-primary'}
              ${indeterminate ? 'checkbox-indeterminate' : ''}
              ${className}
            `}
            {...props}
          />
          {label && (
            <span className="label-text font-medium">{label}</span>
          )}
        </label>
        
        {(error || helperText) && (
          <label className="label pt-0">
            {error ? (
              <span 
                id={`${props.id}-error`} 
                className="label-text-alt text-error animate-fadeIn"
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
