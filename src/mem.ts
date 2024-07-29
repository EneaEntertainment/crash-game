import type { BaseTexture, Renderer } from 'pixi.js';
import { FORMATS, TYPES } from 'pixi.js';

import { game } from './const';

export function mem(): number
{
    const r = game.app.renderer as Renderer;

    let sum = 0;

    for (const texture of r.texture.managedTextures)
        sum += nextPow2(texture.realWidth) * nextPow2(texture.realHeight) * getSize(texture);

    return sum;
}

function getSize(texture: BaseTexture): number
{
    let size = 0;

    switch (texture.format)
    {
        case FORMATS.RGB:
            size = texture.type === TYPES.UNSIGNED_SHORT_5_6_5 ? 2 : 3;
            break;

        case FORMATS.RGBA:
            size = 4;
            break;
    }

    return size;
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
