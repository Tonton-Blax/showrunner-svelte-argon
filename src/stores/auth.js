import { writable, derived } from 'svelte/store';

export const user = writable({ clientPrincipal: null, token: null });

export const userId = derived(
    user,
    $user => $user.clientPrincipal.userId || null
);

export const token = derived(
    user,
    $user => $user.token || null
);