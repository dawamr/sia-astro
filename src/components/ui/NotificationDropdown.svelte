<script lang="ts">
  import { onMount } from 'svelte';

  interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    time: string;
    read: boolean;
  }

  let notifications: Notification[] = [];
  let unreadCount = 0;
  let isOpen = false;

  // Mock data - replace with actual API call
  onMount(() => {
    // TODO: Replace with actual API call
    notifications = [
      {
        id: '1',
        type: 'info',
        title: 'New assignment submitted',
        message: 'John Doe submitted Math Assignment #12',
        time: '2 minutes ago',
        read: false,
      },
      {
        id: '2',
        type: 'warning',
        title: 'Class schedule updated',
        message: 'Physics 101 moved to Room 204',
        time: '1 hour ago',
        read: false,
      },
      {
        id: '3',
        type: 'success',
        title: 'Grade published',
        message: 'Chemistry midterm grades are now available',
        time: '3 hours ago',
        read: false,
      },
    ];
    updateUnreadCount();
  });

  function updateUnreadCount() {
    unreadCount = notifications.filter(n => !n.read).length;
  }

  function markAsRead(id: string) {
    notifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    updateUnreadCount();
  }

  function markAllAsRead() {
    notifications = notifications.map(n => ({ ...n, read: true }));
    updateUnreadCount();
  }

  function getNotificationColor(type: string) {
    switch(type) {
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'error': return 'bg-error';
      default: return 'bg-primary';
    }
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function closeDropdown() {
    isOpen = false;
  }
</script>

<div class="dropdown dropdown-end">
  <!-- Notification Button -->
  <button
    on:click={toggleDropdown}
    class="btn btn-ghost btn-circle hover:bg-primary/10 transition-all duration-300 indicator group"
    aria-label="Notifications"
  >
    <svg 
      class="h-5 w-5 transition-transform duration-300 group-hover:scale-110" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
    {#if unreadCount > 0}
      <span class="indicator-item badge badge-primary badge-sm animate-pulse">
        {unreadCount}
      </span>
    {/if}
  </button>

  <!-- Dropdown Content -->
  {#if isOpen}
    <div 
      class="dropdown-content menu p-0 shadow-2xl bg-base-100 rounded-2xl w-80 mt-3 border border-base-300/50 animate-fadeIn"
      on:click|stopPropagation
      on:keydown={(e) => e.key === 'Escape' && closeDropdown()}
    >
      <!-- Header -->
      <div class="p-4 border-b border-base-300/50 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg">Notifications</h3>
          {#if unreadCount > 0}
            <span class="badge badge-primary badge-sm gap-1">
              <span class="w-2 h-2 rounded-full bg-primary-content animate-pulse"></span>
              {unreadCount} New
            </span>
          {/if}
        </div>
        {#if unreadCount > 0}
          <button 
            on:click={markAllAsRead}
            class="text-xs text-primary hover:text-secondary transition-colors mt-2"
          >
            Mark all as read
          </button>
        {/if}
      </div>

      <!-- Notifications List -->
      <ul class="max-h-96 overflow-y-auto custom-scrollbar">
        {#if notifications.length === 0}
          <li class="p-8 text-center">
            <div class="text-base-content/40">
              <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
              <p class="text-sm">No notifications</p>
            </div>
          </li>
        {:else}
          {#each notifications as notification (notification.id)}
            <li>
              <button
                on:click={() => markAsRead(notification.id)}
                class="flex items-start gap-3 p-4 hover:bg-base-200/50 border-b border-base-300/30 w-full text-left transition-colors duration-200 {!notification.read ? 'bg-primary/5' : ''}"
              >
                <div class="w-2 h-2 rounded-full {getNotificationColor(notification.type)} mt-2 {!notification.read ? 'animate-pulse' : 'opacity-50'}"></div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-sm {!notification.read ? 'text-base-content' : 'text-base-content/70'}">
                    {notification.title}
                  </p>
                  <p class="text-xs text-base-content/60 mt-0.5 truncate">
                    {notification.message}
                  </p>
                  <p class="text-xs text-base-content/40 mt-1 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {notification.time}
                  </p>
                </div>
                {#if !notification.read}
                  <div class="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                {/if}
              </button>
            </li>
          {/each}
        {/if}
      </ul>

      <!-- Footer -->
      <div class="p-3 border-t border-base-300/50 bg-base-200/30">
        <a 
          href="/notifications" 
          class="btn btn-ghost btn-sm btn-block hover:bg-primary/10 transition-colors"
          on:click={closeDropdown}
        >
          View All Notifications →
        </a>
      </div>
    </div>
  {/if}
</div>

<!-- Click outside to close -->
{#if isOpen}
  <button
    class="fixed inset-0 z-0"
    on:click={closeDropdown}
    aria-label="Close notifications"
  ></button>
{/if}

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: oklch(var(--bc) / 0.1);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: oklch(var(--bc) / 0.2);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
</style>
