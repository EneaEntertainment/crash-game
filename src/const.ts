import type { Application } from 'pixi.js';

export interface IRes {
    path: string;
    name: string;
    title: string;
}

export const RES: Record<number, IRes> = {
    2048:
        {
            path  : '/2048/',
            name  : '2048_',
            title : '16MB'
        },

    4096:
        {
            path  : '/4096/',
            name  : '4096_',
            title : '64MB'
        }
};

export const game =
    {
        app    : {} as Application,
        max    : 25,
        isBusy : false,
        data   : { 2048: 0, 4096: 0 }
    };
