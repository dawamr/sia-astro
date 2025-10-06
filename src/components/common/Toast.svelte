<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-svelte';

  export let message: string;
  export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
  export let duration: number = 5000;
  export let onClose: (() => void) | undefined = undefined;
  export let position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right';

  let visible = true;
  let timeoutId: ReturnType<typeof setTimeout>;

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  onMount(() => {
    if (duration > 0) {
      timeoutId = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  });

  function handleClose() {
    visible = false;
    if (onClose) {
      setTimeout(onClose, 300); // Wait for animation
    }
  }

  const IconComponent = icons[type];
</script>

{#if visible}
  <div 
    class="fixed z-50 {positionClasses[position]}"
    transition:fly={{ y: position.includes('top') ? -20 : 20, duration: 300 }}
  >
    <div 
      role="alert"
      class="alert {colors[type]} shadow-2xl min-w-[300px] max-w-md border-2 border-base-300/50"
    >
      <svelte:component this={IconComponent} class="h-6 w-6 flex-shrink-0" />
      <span class="flex-1">{message}</span>
      <button 
        on:click={handleClose}
        class="btn btn-ghost btn-sm btn-circle hover:bg-base-content/10"
        aria-label="Close notification"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  </div>
{/if}

<style>
  .alert {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
