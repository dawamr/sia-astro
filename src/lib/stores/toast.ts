import { atom } from 'nanostores';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const toastsStore = atom<Toast[]>([]);

let toastId = 0;

export const toastActions = {
  show: (message: string, type: Toast['type'] = 'info', duration = 5000) => {
    const id = `toast-${++toastId}`;
    const toast: Toast = { id, message, type, duration };
    
    toastsStore.set([...toastsStore.get(), toast]);
    
    return id;
  },

  success: (message: string, duration?: number) => {
    return toastActions.show(message, 'success', duration);
  },

  error: (message: string, duration?: number) => {
    return toastActions.show(message, 'error', duration);
  },

  warning: (message: string, duration?: number) => {
    return toastActions.show(message, 'warning', duration);
  },

  info: (message: string, duration?: number) => {
    return toastActions.show(message, 'info', duration);
  },

  dismiss: (id: string) => {
    toastsStore.set(toastsStore.get().filter(t => t.id !== id));
  },

  dismissAll: () => {
    toastsStore.set([]);
  },
};
