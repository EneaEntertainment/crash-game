import { game } from './const';

export function resize()
{
    const { innerWidth, innerHeight } = window;
    const ratio = Math.min(innerWidth / 1920, innerHeight / 1080);

    game.app.renderer.resize(1920 * ratio, 1080 * ratio);
    game.app.stage.scale.set(ratio);

    const view = game.app.renderer.view as HTMLCanvasElement;

    view.style.position = 'absolute';
    view.style.left = `${(innerWidth - game.app.renderer.width) / 2}px`;
    view.style.top = `${(innerHeight - game.app.renderer.height) / 2}px`;
}
