import { getContext, setContext } from 'svelte';
import type { WordItem } from '$lib/types';
import { ANIMATION_TIMINGS } from '$lib/config/animations';
import { withTimeout } from '$lib/utils/timeout';

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

	initWord() {
		const word = this.#words[this.index % this.#words.length].word;

		// Create letters with unique IDs
		const letters: PuzzleLetter[] = word.split('').map((letter, i) => ({
			id: `${this.index}-${i}`,
			letter,
			originalIndex: i
		}));

		// Shuffle letters (Fisher-Yates)
		const shuffled = [...letters];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}

		// Ensure not in original order for words > 2 letters
		if (shuffled.length > 2) {
			const isOriginalOrder = shuffled.every((l, i) => l.originalIndex === i);
			if (isOriginalOrder) {
				[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
			}
		}

		this.pool = shuffled;
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
			withTimeout(() => {
				this.shakeSlotIndex = null;
			}, ANIMATION_TIMINGS.SHAKE);
			return;
		}

		// Correct! Place the letter
		this.placeLetter(slotIndex, letter);
	}

	startCelebration() {
		this.celebrationPhase = true;
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
