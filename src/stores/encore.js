
import Client from "../showrunner.ts";


import { readable } from 'svelte/store';

export const encore = readable(null, function start(set) {
    set(new Client("dev"));

    return function stop() {
    };
});

