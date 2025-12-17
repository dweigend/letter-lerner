import type { LayoutServerLoad } from './$types';
import type { WordItem } from '$lib/types';
import wordsData from '$lib/data/words.json';
import { shuffleArray } from '$lib/utils/array';

export const load: LayoutServerLoad = async () => {
	const words: WordItem[] = shuffleArray(wordsData);
	return { words };
};
