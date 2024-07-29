import { Application, Assets, BaseTexture, FORMATS, MIPMAP_MODES, TYPES, Text } from 'pixi.js';
import { RES, game } from './const';

import { button } from './button';
import { createSprite } from './sprite';
import { mem } from './mem';
import { resize } from './resize';

let t: Text | null = null;

const isRGBA = true;

const FORMAT = isRGBA ? FORMATS.RGBA : FORMATS.RGB;
const TYPE = isRGBA ? TYPES.UNSIGNED_BYTE : TYPES.UNSIGNED_SHORT_5_6_5;

window.onload = () =>
{
    BaseTexture.defaultOptions.mipmap = MIPMAP_MODES.OFF;

    game.app = new Application({
        width           : 1920,
        height          : 1080,
        backgroundColor : 0x202020,
        autoDensity     : true
    });

    document.body.appendChild(game.app.view as HTMLCanvasElement);

    button(960 - 180, 960, isRGBA ? '32MB' : '8MB').on('pointerdown', () => { add(2048); });
    button(960 + 180, 960, isRGBA ? '64MB' : '32MB').on('pointerdown', () => { add(4096); });

    window.addEventListener('resize', () => { resize(); });

    resize();
};

async function add(id: number): Promise<void>
{
    if (game.isBusy)
        return;

    await addTexture(id);

    if (t === null)
    {
        t = new Text('', { fill: 0xffffff, fontSize: 64 });

        t.anchor.set(0.5);
        t.position.set(960, 820);

        game.app.stage.addChild(t);
    }

    game.app.renderer.render(game.app.stage);

    // @ts-ignore
    t.text = `Total: ${(mem() / 1024 / 1024).toFixed(2)}MB (${game.data[id]})`;
}

async function addTexture(id: number): Promise<void>
{
    const res = RES[id];
    const { path, name } = res;
    // @ts-ignore
    const index = game.data[id]++;

    if (index >= game.max)
    {
        console.warn('Max reached');

        return;
    }

    game.isBusy = true;

    const texture = await Assets.load({ src: `${path}${name}${index}.jpg`, data: { format: FORMAT, type: TYPE } });

    game.app.stage.addChild(createSprite(texture));

    game.isBusy = false;
}

