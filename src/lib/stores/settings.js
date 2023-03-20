import { writable } from "svelte/store";

const settings = writable({
    colorScheme : "dark",
    fontSize: 12,

})

export default settings;