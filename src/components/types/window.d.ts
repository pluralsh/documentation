import type gsap from 'gsap'

export { }

declare global {
  interface Window {
    gsap?: typeof gsap;
  }
}
