import { type ReactNode } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  ring?: boolean;
  ringColor?: string;
  className?: string;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  shape = 'circle',
  status,
  ring = false,
  ringColor = 'ring-primary',
  className = '',
}: AvatarProps) {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-xl',
  };

  const statusColors = {
    online: 'bg-success',
    offline: 'bg-base-300',
    away: 'bg-warning',
    busy: 'bg-error',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`avatar ${status ? 'online' : ''} ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} ${shapeClasses[shape]}
          ${ring ? `ring ${ringColor} ring-offset-base-100 ring-offset-2` : ''}
          relative
        `}
      >
        {src ? (
          <img src={src} alt={alt} className="object-cover" />
        ) : (
          <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-semibold">
            {fallback ? getInitials(fallback) : '?'}
          </div>
        )}
        
        {status && (
          <span 
            className={`
              absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-100
              ${statusColors[status]}
            `}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    </div>
  );
}

// Avatar Group
interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt?: string;
    fallback?: string;
  }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({ avatars, max = 5, size = 'md', className = '' }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={`avatar-group -space-x-4 ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          ring
        />
      ))}
      {remaining > 0 && (
        <div className="avatar placeholder">
          <div className={`
            ${size === 'xs' ? 'w-8 h-8' : ''}
            ${size === 'sm' ? 'w-10 h-10' : ''}
            ${size === 'md' ? 'w-12 h-12' : ''}
            ${size === 'lg' ? 'w-16 h-16' : ''}
            bg-neutral text-neutral-content rounded-full
          `}>
            <span className="text-xs font-semibold">+{remaining}</span>
          </div>
        </div>
      )}
    </div>
  );
}
