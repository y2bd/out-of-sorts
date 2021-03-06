import * as P from "pixi.js";

export function lease(
  current: number,
  target: number,
  ease: number,
  closeness = 0.05
) {
  if (current + closeness === target) {
    return target;
  } else {
    return current + (target - current) / ease;
  }
}

export function cacheDisplayObjectAsTexture(displayObject: P.DisplayObject) {
  let cachedTexture: P.Texture | undefined;
  return function(renderer: P.Renderer) {
    return (
      cachedTexture ||
      (cachedTexture = renderer.generateTexture(
        displayObject,
        P.SCALE_MODES.LINEAR,
        1
      ))
    );
  };
}

export function dist(a: number, b: number) {
  return Math.abs(a - b);
}

export function sign(a: number): number {
  return a === 0 ? 0 : a > 0 ? 1 : -1;
}
