interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
  className?: string;
  label?: string;
}

export default function Spinner({ 
  size = 'md', 
  variant = 'spinner',
  color = 'primary',
  className = '',
  label,
}: SpinnerProps) {
  const sizeClasses = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
    xl: 'w-16 h-16',
  };

  const variantClasses = {
    spinner: 'loading-spinner',
    dots: 'loading-dots',
    ring: 'loading-ring',
    ball: 'loading-ball',
    bars: 'loading-bars',
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    neutral: 'text-neutral',
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span 
        className={`
          loading ${variantClasses[variant]} ${sizeClasses[size]} ${colorClasses[color]}
        `}
      />
      {label && (
        <span className="text-sm text-base-content/60">{label}</span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Inline Spinner (for buttons, cards, etc)
interface InlineSpinnerProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export function InlineSpinner({ size = 'sm', className = '' }: InlineSpinnerProps) {
  const sizeClasses = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
  };

  return (
    <span 
      className={`loading loading-spinner ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
