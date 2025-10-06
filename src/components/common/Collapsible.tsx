import { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleProps {
  title: string | ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  variant?: 'default' | 'bordered' | 'ghost' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onChange?: (isOpen: boolean) => void;
  className?: string;
}

export default function Collapsible({
  title,
  children,
  defaultOpen = false,
  icon,
  variant = 'default',
  size = 'md',
  disabled = false,
  onChange,
  className = '',
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isOpen;
    setIsOpen(newState);
    onChange?.(newState);
  };

  const variantClasses = {
    default: 'bg-base-100 hover:bg-base-200/50',
    bordered: 'bg-base-100 border-2 border-base-300 hover:border-primary/30',
    ghost: 'bg-transparent hover:bg-base-200/30',
    filled: 'bg-base-200 hover:bg-base-300',
  };

  const sizeClasses = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-5 text-lg',
  };

  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-200 ${className}`}>
      {/* Header */}
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between gap-3
          ${variantClasses[variant]} ${sizeClasses[size]}
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          rounded-xl
        `}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <div className="flex items-center gap-3 flex-1 text-left">
          {icon && (
            <div className={`
              flex-shrink-0 transition-transform duration-200
              ${isOpen ? 'text-primary' : 'text-base-content/60'}
            `}>
              {icon}
            </div>
          )}
          <span className="font-semibold">{title}</span>
        </div>

        <ChevronDown
          className={`
            w-5 h-5 transition-transform duration-300 flex-shrink-0
            ${isOpen ? 'rotate-180 text-primary' : 'text-base-content/60'}
          `}
        />
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          height: height,
          overflow: 'hidden',
          transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className={`${sizeClasses[size]} pt-0`}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Accordion Group Component
interface AccordionItem {
  id: string;
  title: string | ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  variant?: 'default' | 'bordered' | 'ghost' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  variant = 'default',
  size = 'md',
  className = '',
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev =>
        prev.includes(id)
          ? prev.filter(itemId => itemId !== id)
          : [...prev, id]
      );
    } else {
      setOpenIds(prev =>
        prev.includes(id) ? [] : [id]
      );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <Collapsible
          key={item.id}
          title={item.title}
          icon={item.icon}
          defaultOpen={openIds.includes(item.id)}
          variant={variant}
          size={size}
          disabled={item.disabled}
          onChange={(isOpen) => {
            if (isOpen) {
              handleToggle(item.id);
            } else {
              setOpenIds(prev => prev.filter(id => id !== item.id));
            }
          }}
        >
          {item.content}
        </Collapsible>
      ))}
    </div>
  );
}

// Nested Collapsible Component
interface NestedCollapsibleProps {
  title: string | ReactNode;
  children: ReactNode;
  level?: number;
  defaultOpen?: boolean;
  icon?: ReactNode;
}

export function NestedCollapsible({
  title,
  children,
  level = 0,
  defaultOpen = false,
  icon,
}: NestedCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const indent = level * 16; // 16px per level

  return (
    <div style={{ marginLeft: `${indent}px` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-2 hover:bg-base-200 rounded-lg transition-colors text-left"
      >
        <ChevronRight
          className={`
            w-4 h-4 transition-transform duration-200
            ${isOpen ? 'rotate-90' : ''}
          `}
        />
        {icon && <span className="text-base-content/60">{icon}</span>}
        <span className="font-medium text-sm">{title}</span>
      </button>

      {isOpen && (
        <div className="mt-1">
          {children}
        </div>
      )}
    </div>
  );
}
