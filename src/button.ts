import { Sprite, Text, Texture } from 'pixi.js';

import { game } from './const';

export function button(x: number, y: number, title: string): Sprite
{
    const b = new Sprite(Texture.WHITE);

    b.anchor.set(0.5);
    b.width = 300;
    b.height = 140;
    b.position.set(x, y);
    b.alpha = 0.5;
    b.tint = 0x0;
    b.eventMode = 'static';
    b.cursor = 'pointer';

    game.app.stage.addChild(b);

    const t = new Text(title, { fill: 0xffffff, fontSize: 64 });

    t.anchor.set(0.5);
    t.scale.set(1 / b.scale.x, 1 / b.scale.y);

    b.addChild(t);

    return b;
}
