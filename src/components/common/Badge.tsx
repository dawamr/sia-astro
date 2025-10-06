import { type ReactNode } from 'react';
import { X } from 'lucide-react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  outline?: boolean;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  outline = false,
  dot = false,
  removable = false,
  onRemove,
  className = '',
}: BadgeProps) {
  const sizeClasses = {
    xs: 'badge-xs text-xs',
    sm: 'badge-sm text-xs',
    md: 'badge-md text-sm',
    lg: 'badge-lg text-base',
  };

  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    ghost: 'badge-ghost',
    info: 'badge-info',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    neutral: 'badge-neutral',
  };

  return (
    <span 
      className={`
        badge ${variantClasses[variant]} ${sizeClasses[size]}
        ${outline ? 'badge-outline' : ''}
        ${removable ? 'gap-1 pr-1' : ''}
        ${className}
      `}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current"></span>}
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="btn btn-ghost btn-xs btn-circle hover:bg-base-content/20"
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

// Status Badge presets
export function StatusBadge({ status }: { status: 'active' | 'inactive' | 'pending' | 'archived' }) {
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active', dot: true },
    inactive: { variant: 'error' as const, label: 'Inactive', dot: true },
    pending: { variant: 'warning' as const, label: 'Pending', dot: true },
    archived: { variant: 'ghost' as const, label: 'Archived', dot: false },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} dot={config.dot} size="sm">
      {config.label}
    </Badge>
  );
}
