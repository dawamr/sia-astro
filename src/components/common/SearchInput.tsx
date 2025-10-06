import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  defaultValue?: string;
  loading?: boolean;
  className?: string;
}

export default function SearchInput({
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  defaultValue = '',
  loading = false,
  className = '',
}: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Don't search on initial render with empty value
    if (value === defaultValue && !value) {
      return;
    }

    setIsSearching(true);

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
      setIsSearching(false);
    }, debounceMs);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, debounceMs, onSearch, defaultValue]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className={`form-control ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="input input-bordered w-full pl-10 pr-10 transition-all duration-200 focus:border-primary"
          aria-label="Search"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {(loading || isSearching) && (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          )}
          
          {value && !loading && !isSearching && (
            <button
              onClick={handleClear}
              className="btn btn-ghost btn-xs btn-circle hover:bg-base-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
