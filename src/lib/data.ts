export type WordItem = {
	word: string;
	emoji: string;
};

// German QWERTZ keyboard layout with umlauts
export const KEYBOARD_ROWS = [
	'QWERTZUIOPÜ'.split(''),
	'ASDFGHJKLÖÄ'.split(''),
	'YXCVBNM'.split('')
] as const;
