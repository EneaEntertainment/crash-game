import { FORMATS, type Renderer } from 'pixi.js';
import { game } from './const';

export function mem(): number
{
    const r = game.app.renderer as Renderer;

    let sum = 0;

    for (const texture of r.texture.managedTextures)
        sum += nextPow2(texture.realWidth) * nextPow2(texture.realHeight) * (texture.format === FORMATS.RGBA ? 4 : 0);

    return sum;
}

function nextPow2(v: number): number
{
    v += v === 0 ? 1 : 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;

    return v + 1;
}
