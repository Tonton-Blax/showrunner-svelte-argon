import { writable, derived } from 'svelte/store';

export const user = writable({ clientPrincipal: null, token: null }, function start(set) {
    fetch("/.auth/me")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const { clientPrincipal } = data;
            set({ clientPrincipal: clientPrincipal, token: null })
        }
        )
        .catch(error => {
            console.log(error);
            set({ clientPrincipal: null, token: null })
        });

    return function stop() { };
});

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
