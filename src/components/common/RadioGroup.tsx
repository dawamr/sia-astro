interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  required?: boolean;
}

export default function RadioGroup({ 
  label, 
  error, 
  helperText,
  options,
  name,
  value,
  onChange,
  direction = 'vertical',
  disabled,
  required,
}: RadioGroupProps) {
  const hasError = !!error;
  
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
          {required && <span className="label-text-alt text-error">*</span>}
        </label>
      )}
      
      <div 
        className={`flex gap-4 ${direction === 'vertical' ? 'flex-col' : 'flex-wrap'}`}
        role="radiogroup"
        aria-invalid={hasError}
        aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
      >
        {options.map((option) => (
          <label 
            key={option.value}
            className={`
              label cursor-pointer justify-start gap-3 p-3 rounded-xl border-2 transition-all duration-200
              ${value === option.value 
                ? 'border-primary bg-primary/10' 
                : 'border-base-300 hover:border-primary/50 hover:bg-base-200/50'
              }
              ${(disabled || option.disabled) ? 'opacity-50 cursor-not-allowed' : ''}
              ${hasError ? 'border-error' : ''}
            `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={disabled || option.disabled}
              className={`
                radio transition-all duration-200
                ${hasError ? 'radio-error' : 'radio-primary'}
              `}
            />
            <div className="flex-1">
              <span className="label-text font-medium">{option.label}</span>
              {option.description && (
                <p className="text-xs text-base-content/60 mt-0.5">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      
      {(error || helperText) && (
        <label className="label">
          {error ? (
            <span 
              id={`${name}-error`} 
              className="label-text-alt text-error animate-fadeIn"
              role="alert"
            >
              {error}
            </span>
          ) : (
            <span id={`${name}-helper`} className="label-text-alt text-base-content/60">
              {helperText}
            </span>
          )}
        </label>
      )}
    </div>
  );
}
