import { ButtonList } from './buttons.js';
import { ContentOptions } from './content.js';
export interface SwalOptions {
    title: string;
    text: string;
    icon: string;
    buttons: ButtonList | Array<string | boolean>;
    content: ContentOptions;
    className: string;
    closeOnClickOutside: boolean;
    closeOnEsc: boolean;
    dangerMode: boolean;
    timer: number;
}
export declare const setDefaults: (opts: object) => void;
export declare const getOpts: (...params: (string | Partial<SwalOptions>)[]) => SwalOptions;
