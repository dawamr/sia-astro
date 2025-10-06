import { useEffect, type ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { authStore } from '../../lib/stores/auth';
import Spinner from './Spinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requiredRoles = [],
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const auth = useStore(authStore);

  useEffect(() => {
    // Redirect if not authenticated
    if (!auth.isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [auth.isAuthenticated, redirectTo]);

  // Show loading while checking auth
  if (!auth.isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="Checking authentication..." />
      </div>
    );
  }

  // Check role-based access
  if (requiredRoles.length > 0 && auth.user) {
    const hasRequiredRole = requiredRoles.some(role => 
      auth.user?.roles.includes(role)
    );

    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
            <p className="text-base-content/60 mb-6">
              You don't have permission to access this page.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="btn btn-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Role-based wrapper
export function RequireRole({ 
  roles, 
  children 
}: { 
  roles: string[]; 
  children: ReactNode;
}) {
  const auth = useStore(authStore);

  if (!auth.user) return null;

  const hasRole = roles.some(role => auth.user?.roles.includes(role));

  return hasRole ? <>{children}</> : null;
}

// Admin only wrapper
export function AdminOnly({ children }: { children: ReactNode }) {
  return <RequireRole roles={['admin', 'super_admin']}>{children}</RequireRole>;
}

// Teacher only wrapper
export function TeacherOnly({ children }: { children: ReactNode }) {
  return <RequireRole roles={['teacher', 'admin', 'super_admin']}>{children}</RequireRole>;
}
