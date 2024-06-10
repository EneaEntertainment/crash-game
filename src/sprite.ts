import type { Resource, Texture } from 'pixi.js';

import { Sprite } from 'pixi.js';

let x = 60;
let y = 60;

export function createSprite(texture: Texture<Resource>)
{
    const s = new Sprite(texture);

    s.anchor.set(0.5);
    s.scale.set(0.025);
    s.position.set(x, y);

    updatePosition();

    return s;
}

function updatePosition()
{
    x += 110;

    if (x >= 1900)
    {
        x = 60;
        y += 110;

        if (y >= 800)
            y = 60;
    }
}
