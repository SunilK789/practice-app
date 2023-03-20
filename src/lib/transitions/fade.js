
import {cubicInOut} from 'svelte/easing'

export default function fade(node,{delay = 0, duration = 400, easing= cubicInOut, spin = 1}){
    const originalOpacity = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        tick:(t)=>{
            return `
            opacity: ${t * originalOpacity};
            `;
        }
    }
}