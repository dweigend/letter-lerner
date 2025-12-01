import type { PageServerLoad, Actions } from './$types';
import type { WordItem } from '$lib/types';
import { fail } from '@sveltejs/kit';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const WORDS_FILE = resolve('src/lib/data/words.json');

function loadWords(): WordItem[] {
	const data = readFileSync(WORDS_FILE, 'utf-8');
	return JSON.parse(data);
}

function saveWords(words: WordItem[]): void {
	writeFileSync(WORDS_FILE, JSON.stringify(words, null, '\t'));
}

export const load: PageServerLoad = async () => {
	const words = loadWords();
	return { words };
};

export const actions: Actions = {
	add: async ({ request }) => {
		const formData = await request.formData();
		const word = formData.get('word')?.toString().toUpperCase().trim();
		const emoji = formData.get('emoji')?.toString().trim();

		if (!word || !emoji) {
			return fail(400, { error: 'Wort und Emoji sind erforderlich' });
		}

		const words = loadWords();

		if (words.some((w) => w.word === word)) {
			return fail(400, { error: 'Dieses Wort existiert bereits' });
		}

		words.push({ word, emoji });
		saveWords(words);

		return { success: true };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const word = formData.get('word')?.toString();

		if (!word) {
			return fail(400, { error: 'Wort ist erforderlich' });
		}

		const words = loadWords();
		const filtered = words.filter((w) => w.word !== word);

		if (filtered.length === words.length) {
			return fail(404, { error: 'Wort nicht gefunden' });
		}

		saveWords(filtered);

		return { success: true };
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const oldWord = formData.get('oldWord')?.toString();
		const newWord = formData.get('word')?.toString().toUpperCase().trim();
		const emoji = formData.get('emoji')?.toString().trim();

		if (!oldWord || !newWord || !emoji) {
			return fail(400, { error: 'Alle Felder sind erforderlich' });
		}

		const words = loadWords();
		const index = words.findIndex((w) => w.word === oldWord);

		if (index === -1) {
			return fail(404, { error: 'Wort nicht gefunden' });
		}

		words[index] = { word: newWord, emoji };
		saveWords(words);

		return { success: true };
	}
};
