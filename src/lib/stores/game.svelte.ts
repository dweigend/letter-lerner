import { getContext, setContext } from 'svelte';
import type { WordItem } from '$lib/types';
import { ANIMATION_TIMINGS } from '$lib/config/animations';
import { withTimeout } from '$lib/utils/timeout';
import { playSound } from '$lib/utils/audio';

const GAME_CONTEXT = Symbol('game');

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
		playSound('celebration');
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
			playSound('click');
		} else {
			this.shakeIndex = firstEmptyIndex;
			this.lastKeyCorrect = false;
			playSound('error');
			withTimeout(() => {
				this.shakeIndex = null;
			}, ANIMATION_TIMINGS.SHAKE);
		}

		withTimeout(() => {
			this.lastPressedKey = null;
			this.lastKeyCorrect = null;
		}, ANIMATION_TIMINGS.KEY_FEEDBACK);
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
