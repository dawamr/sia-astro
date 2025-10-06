import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { User, Settings, LogOut, ChevronDown, Shield, Bell, HelpCircle } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { authStore, authActions } from '../../lib/stores/auth';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const auth = useStore(authStore);

  // Get user from auth store
  const user = auth.user || {
    userId: '',
    email: 'guest@sia.local',
    firstName: 'Guest',
    lastName: 'User',
    roles: ['guest'],
  };

  const displayName = `${user.firstName} ${user.lastName}`;
  const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  const primaryRole = user.roles[0] || 'guest';

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      // Call logout API
      const response = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:3000'}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`,
        },
      });

      // Clear auth state
      authActions.logout();
      
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API fails
      authActions.logout();
      window.location.href = '/login';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'super_admin': return 'badge-error';
      case 'admin': return 'badge-warning';
      case 'teacher': return 'badge-info';
      case 'student': return 'badge-success';
      default: return 'badge-ghost';
    }
  };

  const getRoleLabel = (role: string) => {
    switch(role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'teacher': return 'Teacher';
      case 'student': return 'Student';
      case 'parent': return 'Parent';
      default: return 'Guest';
    }
  };

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        className="btn btn-ghost gap-2 hover:bg-primary/10 transition-all duration-300 group"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        <div className="avatar placeholder">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
            <span className="text-sm font-semibold">{userInitials}</span>
          </div>
        </div>
        <div className="hidden text-left lg:block">
          <p className="text-sm font-semibold">{displayName}</p>
          <p className="text-xs text-base-content/60">{getRoleLabel(primaryRole)}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div
            className="absolute right-0 top-full mt-3 w-80 rounded-2xl shadow-2xl border border-base-300/50 z-50 overflow-hidden bg-base-200"
            style={{ animation: 'slideDown 0.3s ease-out' }}
          >
            {/* User info header with gradient */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0"></div>
              <div className="relative p-4">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="w-14 h-14 rounded-2xl text-primary-content shadow-lg ring-2 ring-white/20 text-center">
                      <span className="text-xl font-bold">{userInitials}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base truncate">{displayName}</p>
                    <p className="text-xs text-base-content/70 truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                      {user.email}
                    </p>
                    <div className="mt-1.5">
                      <span className={`badge badge-sm ${getRoleBadgeColor(primaryRole)} gap-1`}>
                        <span className="w-1 h-1 rounded-full bg-current"></span>
                        {getRoleLabel(primaryRole)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              <div className="space-y-1">
                <a 
                  href="/dashboard/profile" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">My Profile</p>
                    <p className="text-xs text-base-content/60">View and edit profile</p>
                  </div>
                </a>

                <a 
                  href="/dashboard/settings" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/10 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Settings className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Settings</p>
                    <p className="text-xs text-base-content/60">Preferences & privacy</p>
                  </div>
                </a>

                <a 
                  href="/dashboard/notifications" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/10 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Bell className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Notifications</p>
                    <p className="text-xs text-base-content/60">Manage alerts</p>
                  </div>
                  <span className="badge badge-primary badge-sm">3</span>
                </a>

                {(primaryRole === 'super_admin' || primaryRole === 'admin') && (
                  <>
                    <div className="divider my-1 text-xs text-base-content/40">Admin</div>
                    <a 
                      href="/admin/roles" 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-warning/10 transition-all duration-200 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
                        <Shield className="h-5 w-5 text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Admin Panel</p>
                        <p className="text-xs text-base-content/60">Manage system</p>
                      </div>
                    </a>
                  </>
                )}

                <a 
                  href="/support" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-info/10 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-info/10 flex items-center justify-center group-hover:bg-info/20 transition-colors">
                    <HelpCircle className="h-5 w-5 text-info" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Help & Support</p>
                    <p className="text-xs text-base-content/60">Get assistance</p>
                  </div>
                </a>
              </div>

              {/* Logout button */}
              <div className="mt-2 pt-2 border-t border-base-300/50">
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-error/10 transition-all duration-200 group w-full"
                >
                  <div className="w-9 h-9 rounded-lg bg-error/10 flex items-center justify-center group-hover:bg-error/20 transition-colors">
                    <LogOut className="h-5 w-5 text-error" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm text-error">Logout</p>
                    <p className="text-xs text-base-content/60">Sign out of account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

