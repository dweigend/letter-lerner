import { getContext, setContext } from 'svelte';
import type { WordItem } from '$lib/types';
import { ANIMATION_TIMINGS } from '$lib/config/animations';
import { withTimeout } from '$lib/utils/timeout';
import { shuffleArray } from '$lib/utils/array';
import { playSound } from '$lib/utils/audio';

const PUZZLE_CONTEXT = Symbol('puzzle');

export interface PuzzleLetter {
	id: string;
	letter: string;
	originalIndex: number;
}

export interface PuzzleSlot {
	index: number;
	letter: PuzzleLetter | null;
}

export class PuzzleGame {
	#words: WordItem[];

	index = $state(0);
	pool = $state<PuzzleLetter[]>([]);
	slots = $state<PuzzleSlot[]>([]);
	shakeSlotIndex = $state<number | null>(null);
	celebrationPhase = $state(false);

	constructor(words: WordItem[]) {
		this.#words = words;
		this.initWord();
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
		return this.slots.every((slot, i) => slot.letter?.letter === this.word[i]);
	}

	get progress() {
		return (this.index / this.#words.length) * 100;
	}

	get totalWords() {
		return this.#words.length;
	}

	#createLetters(word: string): PuzzleLetter[] {
		return word.split('').map((letter, i) => ({
			id: `${this.index}-${i}`,
			letter,
			originalIndex: i
		}));
	}

	#ensureShuffled(letters: PuzzleLetter[]): PuzzleLetter[] {
		const shuffled = shuffleArray(letters);
		if (shuffled.length > 2) {
			const isOriginal = shuffled.every((l, i) => l.originalIndex === i);
			if (isOriginal) {
				[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
			}
		}
		return shuffled;
	}

	initWord() {
		const word = this.word;
		this.pool = this.#ensureShuffled(this.#createLetters(word));
		this.slots = word.split('').map((_, i) => ({ index: i, letter: null }));
		this.shakeSlotIndex = null;
		this.celebrationPhase = false;
	}

	placeLetter(slotIndex: number, letter: PuzzleLetter) {
		// Remove from pool
		this.pool = this.pool.filter((l) => l.id !== letter.id);

		// Place in slot
		const newSlots = [...this.slots];
		newSlots[slotIndex] = { ...newSlots[slotIndex], letter };
		this.slots = newSlots;
	}

	returnToPool(slotIndex: number) {
		const slot = this.slots[slotIndex];
		if (!slot.letter) return;

		// Add back to pool
		this.pool = [...this.pool, slot.letter];

		// Clear slot
		const newSlots = [...this.slots];
		newSlots[slotIndex] = { ...newSlots[slotIndex], letter: null };
		this.slots = newSlots;
	}

	handleDrop(slotIndex: number, letter: PuzzleLetter, sourceContainer: string) {
		if (this.celebrationPhase) return;

		// Dropping from another slot back to pool
		if (sourceContainer.startsWith('slot-')) {
			const sourceSlotIndex = parseInt(sourceContainer.split('-')[1]);
			this.returnToPool(sourceSlotIndex);
			return;
		}

		// Validate: correct letter for this position?
		const expectedLetter = this.word[slotIndex];
		if (letter.letter !== expectedLetter) {
			// Wrong placement - shake
			this.shakeSlotIndex = slotIndex;
			playSound('error');
			withTimeout(() => {
				this.shakeSlotIndex = null;
			}, ANIMATION_TIMINGS.SHAKE);
			return;
		}

		// Correct! Place the letter
		this.placeLetter(slotIndex, letter);
		playSound('correct');
	}

	startCelebration() {
		this.celebrationPhase = true;
		playSound('celebration');
	}

	endCelebration() {
		this.celebrationPhase = false;
		this.nextLevel();
	}

	nextLevel() {
		this.index = (this.index + 1) % this.#words.length;
		this.initWord();
	}
}

export function createPuzzleGame(words: WordItem[]) {
	return new PuzzleGame(words);
}

export function setPuzzleContext(game: PuzzleGame) {
	setContext(PUZZLE_CONTEXT, game);
}

export function getPuzzleContext(): PuzzleGame {
	return getContext<PuzzleGame>(PUZZLE_CONTEXT);
}
