import { CategoryKey } from '../types';
export declare type IconSize = 'small' | 'medium' | 'large' | '2x' | '3x' | '4x' | '5x';
declare const icons: {
    clock: string;
    flag: string;
    frown: string;
    gamepad: string;
    lightbulb: string;
    mug: string;
    plane: string;
    robot: string;
    sad: string;
    search: string;
    smiley: string;
    symbols: string;
    tree: string;
    users: string;
    warning: string;
    xmark: string;
};
export { icons };
export declare const categoryIcons: Record<CategoryKey, string>;
export declare function icon(name: string, size?: IconSize): Element;
