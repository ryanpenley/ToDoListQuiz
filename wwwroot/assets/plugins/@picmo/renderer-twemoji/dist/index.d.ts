import { EmojiRecord, EmojiSelection, Renderer } from 'picmo';
declare type TwemojiImageFormat = 'svg' | 'png';
/**
 * Renders emojis using Twemoji images.
 *
 * Emojis are always rendered within the picker as SVGs, using the sprite sheets.
 * By default, the emitted URLs will also be for SVG format, a format of 'png' can be
 * given to get the PNG URLs instead.
 */
export declare class TwemojiRenderer extends Renderer {
    #private;
    private format;
    constructor(format?: TwemojiImageFormat);
    render(record: EmojiRecord, classNames?: string): import("picmo/dist/renderers/renderer").RenderTask;
    emit(record: EmojiRecord): EmojiSelection;
}
export {};
