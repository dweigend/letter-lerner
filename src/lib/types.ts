export interface WordItem {
	word: string;
	emoji: string;
}

export type KeyFeedback = 'correct' | 'error' | null;

export interface GameState {
	index: number;
	input: string[];
	shakeIndex: number | null;
	lastPressedKey: string | null;
	lastKeyCorrect: boolean | null;
	celebrationPhase: boolean;
}
