<script lang="ts">
  import { toastsStore, toastActions } from '../../lib/stores/toast';
  import Toast from './Toast.svelte';

  $: toasts = $toastsStore;
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
  {#each toasts as toast (toast.id)}
    <div class="pointer-events-auto">
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={() => toastActions.dismiss(toast.id)}
        position="top-right"
      />
    </div>
  {/each}
</div>
