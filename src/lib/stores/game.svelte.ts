import { getContext, setContext } from 'svelte';
import type { WordItem } from '$lib/types';

const GAME_CONTEXT = Symbol('game');
const SHAKE_DURATION_MS = 500;
const KEY_FEEDBACK_DURATION_MS = 400;

export class Game {
	#words: WordItem[];

	index = $state(0);
	input = $state<string[]>([]);
	shakeIndex = $state<number | null>(null);
	celebrationPhase = $state(false);

	lastPressedKey = $state<string | null>(null);
	lastKeyCorrect = $state<boolean | null>(null);

	constructor(words: WordItem[]) {
		this.#words = words;
		this.input = new Array(words[0].word.length).fill('');
	}

	get currentLevel() {
		return this.#words[this.index % this.#words.length];
	}

	get word() {
		return this.currentLevel.word;
	}

	get emoji() {
		return this.currentLevel.emoji;
	}

	get isComplete() {
		return this.input.join('') === this.word;
	}

	get progress() {
		return (this.index / this.#words.length) * 100;
	}

	get totalWords() {
		return this.#words.length;
	}

	resetInput() {
		this.input = new Array(this.word.length).fill('');
		this.shakeIndex = null;
		this.celebrationPhase = false;
	}

	nextLevel() {
		this.index = (this.index + 1) % this.#words.length;
		this.resetInput();
	}

	startCelebration() {
		this.celebrationPhase = true;
	}

	endCelebration() {
		this.celebrationPhase = false;
		this.nextLevel();
	}

	handleInput(char: string) {
		if (this.isComplete || this.celebrationPhase) return;

		const upperChar = char.toUpperCase();
		const firstEmptyIndex = this.input.findIndex((c) => c === '');

		if (firstEmptyIndex === -1) return;

		const targetChar = this.word[firstEmptyIndex];
		this.lastPressedKey = upperChar;

		if (upperChar === targetChar) {
			const newInput = [...this.input];
			newInput[firstEmptyIndex] = upperChar;
			this.input = newInput;
			this.shakeIndex = null;
			this.lastKeyCorrect = true;
		} else {
			this.shakeIndex = firstEmptyIndex;
			this.lastKeyCorrect = false;
			setTimeout(() => {
				this.shakeIndex = null;
			}, SHAKE_DURATION_MS);
		}

		setTimeout(() => {
			this.lastPressedKey = null;
			this.lastKeyCorrect = null;
		}, KEY_FEEDBACK_DURATION_MS);
	}
}

export function createGame(words: WordItem[]) {
	return new Game(words);
}

export function setGameContext(game: Game) {
	setContext(GAME_CONTEXT, game);
}

export function getGameContext(): Game {
	return getContext<Game>(GAME_CONTEXT);
}
