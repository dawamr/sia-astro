import { type ReactNode } from 'react';
import { Inbox, Search, AlertCircle, FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: 'default' | 'search' | 'error' | 'no-data';
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className = '',
}: EmptyStateProps) {
  const defaultIcons = {
    default: <Inbox className="w-16 h-16" />,
    search: <Search className="w-16 h-16" />,
    error: <AlertCircle className="w-16 h-16" />,
    'no-data': <FileQuestion className="w-16 h-16" />,
  };

  const iconColors = {
    default: 'text-base-content/20',
    search: 'text-info/40',
    error: 'text-error/40',
    'no-data': 'text-warning/40',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className={`mb-4 ${iconColors[variant]}`}>
        {icon || defaultIcons[variant]}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-base-content">
        {title}
      </h3>
      
      {description && (
        <p className="text-base-content/60 max-w-md mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}

// Preset variants
export function EmptySearch({ searchTerm, onClear }: { searchTerm?: string; onClear?: () => void }) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description={searchTerm ? `No results for "${searchTerm}". Try adjusting your search.` : 'Try searching for something else.'}
      action={
        onClear && (
          <button onClick={onClear} className="btn btn-ghost btn-sm">
            Clear search
          </button>
        )
      }
    />
  );
}

export function EmptyData({ 
  title = 'No data yet', 
  description = 'Get started by creating your first item.',
  onCreate 
}: { 
  title?: string; 
  description?: string; 
  onCreate?: () => void;
}) {
  return (
    <EmptyState
      variant="no-data"
      title={title}
      description={description}
      action={
        onCreate && (
          <button onClick={onCreate} className="btn btn-primary">
            Create New
          </button>
        )
      }
    />
  );
}

export function EmptyError({ 
  title = 'Something went wrong', 
  description = 'We encountered an error loading this content.',
  onRetry 
}: { 
  title?: string; 
  description?: string; 
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      variant="error"
      title={title}
      description={description}
      action={
        onRetry && (
          <button onClick={onRetry} className="btn btn-error">
            Try Again
          </button>
        )
      }
    />
  );
}
