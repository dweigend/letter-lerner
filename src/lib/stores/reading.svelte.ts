import { setContext } from 'svelte';
import type { WordItem } from '$lib/types';
import { ANIMATION_TIMINGS } from '$lib/config/animations';
import { withTimeout } from '$lib/utils/timeout';
import { shuffleArray } from '$lib/utils/array';
import { playSound } from '$lib/utils/audio';

const READING_CONTEXT = Symbol('reading');

export interface EmojiOption {
	id: string;
	emoji: string;
	isCorrect: boolean;
}

export class ReadingGame {
	#words: WordItem[];

	index = $state(0);
	options = $state<EmojiOption[]>([]);
	selectedId = $state<string | null>(null);
	shakeId = $state<string | null>(null);
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
		const selected = this.options.find((o) => o.id === this.selectedId);
		return selected?.isCorrect ?? false;
	}

	get progress() {
		return (this.index / this.#words.length) * 100;
	}

	get totalWords() {
		return this.#words.length;
	}

	#getRandomWrongEmojis(count: number): string[] {
		const correctEmoji = this.emoji;
		const otherEmojis = this.#words.filter((w) => w.emoji !== correctEmoji).map((w) => w.emoji);

		return shuffleArray(otherEmojis).slice(0, count);
	}

	initWord() {
		const correctEmoji = this.emoji;
		const wrongEmojis = this.#getRandomWrongEmojis(2);

		const allOptions: EmojiOption[] = [
			{ id: `${this.index}-correct`, emoji: correctEmoji, isCorrect: true },
			{ id: `${this.index}-wrong-0`, emoji: wrongEmojis[0], isCorrect: false },
			{ id: `${this.index}-wrong-1`, emoji: wrongEmojis[1], isCorrect: false }
		];

		this.options = shuffleArray(allOptions);
		this.selectedId = null;
		this.shakeId = null;
		this.celebrationPhase = false;
	}

	handleSelection(optionId: string) {
		if (this.celebrationPhase) return;
		if (this.selectedId) return; // Already selected correct answer

		const option = this.options.find((o) => o.id === optionId);
		if (!option) return;

		if (option.isCorrect) {
			this.selectedId = optionId;
			playSound('correct');
			// Celebration will be triggered by $effect in page
		} else {
			this.shakeId = optionId;
			playSound('error');
			withTimeout(() => {
				this.shakeId = null;
			}, ANIMATION_TIMINGS.SHAKE);
		}
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

export function createReadingGame(words: WordItem[]) {
	return new ReadingGame(words);
}

export function setReadingContext(game: ReadingGame) {
	setContext(READING_CONTEXT, game);
}
