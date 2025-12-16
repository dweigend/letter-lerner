<script lang="ts">
	import type { EmojiOption } from '$lib/stores/reading.svelte';
	import EmojiGrid from './EmojiGrid.svelte';

	interface Props {
		word: string;
		options: EmojiOption[];
		selectedId: string | null;
		shakeId: string | null;
		isCelebrating?: boolean;
		onSelect: (id: string) => void;
		onCelebrationComplete?: () => void;
	}

	const {
		word,
		options,
		selectedId,
		shakeId,
		isCelebrating = false,
		onSelect,
		onCelebrationComplete
	}: Props = $props();
</script>

<div data-reading-board>
	<div class="game-word">
		{word}
	</div>

	<EmojiGrid {options} {selectedId} {shakeId} {isCelebrating} {onSelect} {onCelebrationComplete} />
</div>
