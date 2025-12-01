import type { PageServerLoad } from './$types';
import type { WordItem } from '$lib/types';
import wordsData from '$lib/data/words.json';

export const load: PageServerLoad = async () => {
	const words: WordItem[] = wordsData;
	return { words };
};
