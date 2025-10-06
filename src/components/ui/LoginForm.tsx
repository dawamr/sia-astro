import { useState, type FormEvent } from 'react';
import { authApi } from '../../lib/api/auth';
import { authActions } from '../../lib/stores/auth';
import { loginSchema, type LoginInput } from '../../lib/validators/auth';
import { AlertCircle, Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        const zodError = error as any;
        const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
        zodError.errors?.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginInput] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(formData);

      if (response.error) {
        setApiError(response.error.message || 'Login failed. Please try again.');
        return;
      }

      if (response.data) {
        // Store tokens and user data
        authActions.login(response.data);

        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* API Error Alert */}
      {apiError && (
        <div className="alert alert-error shadow-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm">{apiError}</span>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text font-semibold text-base">Email</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={`input input-bordered w-full pl-12 h-12 text-base ${
              errors.email ? 'input-error' : 'focus:input-primary'
            }`}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            disabled={isLoading}
            autoComplete="email"
            autoFocus
          />
        </div>
        {errors.email && (
          <label className="label">
            <span className="label-text-alt text-error flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </span>
          </label>
        )}
      </div>

      {/* Password Field */}
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text font-semibold text-base">Password</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className={`input input-bordered w-full pl-12 pr-12 h-12 text-base ${
              errors.password ? 'input-error' : 'focus:input-primary'
            }`}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            disabled={isLoading}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <label className="label">
            <span className="label-text-alt text-error flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.password}
            </span>
          </label>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between pt-1">
        <label className="label cursor-pointer gap-2 p-0">
          <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
          <span className="label-text">Remember me</span>
        </label>
        <a href="/forgot-password" className="link link-primary link-hover text-sm font-medium">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary btn-block h-12 text-base font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <Lock className="h-5 w-5" />
            Sign In
          </>
        )}
      </button>

      {/* Divider */}
      <div className="divider text-sm text-base-content/50">OR</div>

      {/* Quick Login Info */}
      <div className="bg-info/10 rounded-lg p-4 text-sm">
        <p className="font-semibold text-info mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-base-content/70">
          <p>Email: <code className="bg-base-300 px-2 py-0.5 rounded">superadmin@sia.local</code></p>
          <p>Password: <code className="bg-base-300 px-2 py-0.5 rounded">SuperAdmin123!</code></p>
        </div>
      </div>
    </form>
  );
}
