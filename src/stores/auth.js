import { writable, derived } from 'svelte/store';

export const user = writable({ clientPrincipal: null, token: null });

export const userId = derived(
    user,
    $user => $user.clientPrincipal && $user.clientPrincipal.userId || null
);

export const token = derived(
    user,
    $user => $user.token || null
);

export async function getUserInfo(user) {
    const response = await fetch("/.auth/me");
    const payload = await response.json();
    const { clientPrincipal } = payload;
    user.clientPrincipal = clientPrincipal;
}

export async function getToken() {
    const response = await fetch("/api/GetToken");
    const payload = await response.json();
    const { token } = payload;
    console.log(token);
    user.token = token;
}
