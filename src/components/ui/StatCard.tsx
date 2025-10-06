import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
  subtitle?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  color = 'primary',
  subtitle,
  className = '',
}: StatCardProps) {
  const colorClasses = {
    primary: {
      bg: 'from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10',
      border: 'border-primary/20',
      iconBg: 'bg-primary/20',
      iconText: 'text-primary',
      valueText: 'text-primary',
    },
    secondary: {
      bg: 'from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10',
      border: 'border-secondary/20',
      iconBg: 'bg-secondary/20',
      iconText: 'text-secondary',
      valueText: 'text-secondary',
    },
    accent: {
      bg: 'from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10',
      border: 'border-accent/20',
      iconBg: 'bg-accent/20',
      iconText: 'text-accent',
      valueText: 'text-accent',
    },
    success: {
      bg: 'from-success/10 to-success/5 hover:from-success/20 hover:to-success/10',
      border: 'border-success/20',
      iconBg: 'bg-success/20',
      iconText: 'text-success',
      valueText: 'text-success',
    },
    warning: {
      bg: 'from-warning/10 to-warning/5 hover:from-warning/20 hover:to-warning/10',
      border: 'border-warning/20',
      iconBg: 'bg-warning/20',
      iconText: 'text-warning',
      valueText: 'text-warning',
    },
    error: {
      bg: 'from-error/10 to-error/5 hover:from-error/20 hover:to-error/10',
      border: 'border-error/20',
      iconBg: 'bg-error/20',
      iconText: 'text-error',
      valueText: 'text-error',
    },
    info: {
      bg: 'from-info/10 to-info/5 hover:from-info/20 hover:to-info/10',
      border: 'border-info/20',
      iconBg: 'bg-info/20',
      iconText: 'text-info',
      valueText: 'text-info',
    },
  };

  const trendIcons = {
    up: <TrendingUp className="w-3 h-3" />,
    down: <TrendingDown className="w-3 h-3" />,
    neutral: <Minus className="w-3 h-3" />,
  };

  const trendColors = {
    up: 'bg-success/20 text-success',
    down: 'bg-error/20 text-error',
    neutral: 'bg-base-content/10 text-base-content/70',
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`
        group relative overflow-hidden
        bg-gradient-to-br ${colors.bg}
        border ${colors.border}
        rounded-2xl p-6
        transition-all duration-300
        hover:shadow-lg hover:scale-[1.02]
        ${className}
      `}
    >
      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          {/* Title */}
          <p className="text-sm font-medium text-base-content/60 mb-2">
            {title}
          </p>

          {/* Value */}
          <h3 className={`text-3xl font-bold ${colors.valueText} mb-3`}>
            {value}
          </h3>

          {/* Trend & Subtitle */}
          <div className="flex items-center gap-2 flex-wrap">
            {trend && (
              <span
                className={`
                  inline-flex items-center gap-1
                  text-xs font-medium px-2 py-1 rounded-full
                  ${trendColors[trend.direction]}
                `}
              >
                {trendIcons[trend.direction]}
                {trend.value}
              </span>
            )}
            {(trend?.label || subtitle) && (
              <span className="text-xs text-base-content/50">
                {trend?.label || subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Icon */}
        <div
          className={`
            w-12 h-12 rounded-xl
            ${colors.iconBg} ${colors.iconText}
            flex items-center justify-center
            group-hover:scale-110 transition-transform duration-300
          `}
        >
          {icon}
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

// Grid wrapper for stat cards
interface StatGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function StatGrid({ children, columns = 4, className = '' }: StatGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {children}
    </div>
  );
}
