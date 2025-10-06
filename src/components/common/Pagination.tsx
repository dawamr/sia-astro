import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisible = 5,
  className = '',
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftOffset = Math.floor(maxVisible / 2);
    const rightOffset = maxVisible - leftOffset - 1;

    let start = Math.max(1, currentPage - leftOffset);
    let end = Math.min(totalPages, currentPage + rightOffset);

    if (currentPage <= leftOffset) {
      end = maxVisible;
    } else if (currentPage >= totalPages - rightOffset) {
      start = totalPages - maxVisible + 1;
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="join">
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="join-item btn btn-sm"
            aria-label="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        )}
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="join-item btn btn-sm"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`
                join-item btn btn-sm
                ${currentPage === page ? 'btn-active' : ''}
              `}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="join-item btn btn-sm btn-disabled">
              {page}
            </span>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="join-item btn btn-sm"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {showFirstLast && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="join-item btn btn-sm"
            aria-label="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <span className="text-sm text-base-content/60 ml-4">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
