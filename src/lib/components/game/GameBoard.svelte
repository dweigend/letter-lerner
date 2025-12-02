<script lang="ts">
	import WordSlots from './WordSlots.svelte';

	let {
		emoji,
		word,
		input,
		shakeIndex,
		isCelebrating = false,
		onCelebrationComplete
	}: {
		emoji: string;
		word: string;
		input: string[];
		shakeIndex: number | null;
		isCelebrating?: boolean;
		onCelebrationComplete?: () => void;
	} = $props();
</script>

<div class="game-board">
	<div class="game-emoji">
		{emoji}
	</div>

	<WordSlots {word} {input} {shakeIndex} {isCelebrating} {onCelebrationComplete} />
</div>
