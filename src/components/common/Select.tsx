import { forwardRef, type SelectHTMLAttributes } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  loading?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    error, 
    helperText, 
    options,
    placeholder = 'Select an option',
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
          <select
            ref={ref}
            disabled={disabled || loading}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            className={`
              select select-bordered w-full transition-all duration-200
              ${hasError ? 'select-error focus:border-error' : 'focus:border-primary'}
              ${loading ? 'opacity-60' : ''}
              appearance-none pr-10
              ${className}
            `}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {loading ? (
              <span className="loading loading-spinner loading-sm text-primary"></span>
            ) : hasError ? (
              <AlertCircle className="h-5 w-5 text-error" />
            ) : (
              <ChevronDown className="h-5 w-5 text-base-content/40" />
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

Select.displayName = 'Select';

export default Select;
