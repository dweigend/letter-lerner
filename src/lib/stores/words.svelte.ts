import { getContext, setContext } from 'svelte';
import type { WordItem } from '$lib/types';

const WORDS_CONTEXT = Symbol('words');

class WordsStore {
	words = $state<WordItem[]>([]);

	get count() {
		return this.words.length;
	}

	init(words: WordItem[]) {
		this.words = words;
	}

	getWord(index: number): WordItem {
		return this.words[index % this.words.length];
	}
}

export function createWordsStore() {
	return new WordsStore();
}

export function setWordsContext(store: WordsStore) {
	setContext(WORDS_CONTEXT, store);
}

export function getWordsContext(): WordsStore {
	return getContext<WordsStore>(WORDS_CONTEXT);
}
