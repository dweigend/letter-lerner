import { WORDS } from './data';

const SHAKE_DURATION_MS = 500;
const KEY_FEEDBACK_DURATION_MS = 400;

export class Game {
	index = $state(0);
	input = $state<string[]>([]);
	shakeIndex = $state<number | null>(null);

	// Track keyboard feedback for visual animation
	lastPressedKey = $state<string | null>(null);
	lastKeyCorrect = $state<boolean | null>(null);

	// Derived state for the current target word and emoji
	currentLevel = $derived(WORDS[this.index]);
	word = $derived(this.currentLevel.word);
	emoji = $derived(this.currentLevel.emoji);

	// Check if the current word is fully completed
	isComplete = $derived(this.input.join('') === this.word);

	// Helper for progress bar or UI
	progress = $derived((this.index / WORDS.length) * 100);

	constructor() {
		this.resetInput();
	}

	resetInput() {
		this.input = new Array(this.word.length).fill('');
		this.shakeIndex = null;
	}

	nextLevel() {
		// Loop back to start if at end, otherwise advance
		this.index = this.index < WORDS.length - 1 ? this.index + 1 : 0;
		this.resetInput();
	}

	handleInput(char: string) {
		if (this.isComplete) return;

		const upperChar = char.toUpperCase();

		// Find the first empty slot
		const firstEmptyIndex = this.input.findIndex((c) => c === '');

		if (firstEmptyIndex === -1) return;

		// Check if the input matches the target character at that position
		const targetChar = this.word[firstEmptyIndex];

		// Set the pressed key for visual feedback
		this.lastPressedKey = upperChar;

		if (upperChar === targetChar) {
			// Correct! Fill the slot and show green flash
			const newInput = [...this.input];
			newInput[firstEmptyIndex] = upperChar;
			this.input = newInput;
			this.shakeIndex = null;
			this.lastKeyCorrect = true;
		} else {
			// Incorrect! Shake effect and red flash
			this.shakeIndex = firstEmptyIndex;
			this.lastKeyCorrect = false;
			setTimeout(() => {
				this.shakeIndex = null;
			}, SHAKE_DURATION_MS);
		}

		// Clear key feedback after animation completes
		setTimeout(() => {
			this.lastPressedKey = null;
			this.lastKeyCorrect = null;
		}, KEY_FEEDBACK_DURATION_MS);
	}
}

// Create a global instance or factory if needed.
// For this app, a factory function is good, or just exporting the class.
export const createGame = () => new Game();
