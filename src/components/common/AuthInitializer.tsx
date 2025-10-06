import { useEffect } from 'react';
import { initializeAuth } from '../../lib/stores/auth';

export default function AuthInitializer() {
  useEffect(() => {
    initializeAuth();
  }, []);

  return null;
}
