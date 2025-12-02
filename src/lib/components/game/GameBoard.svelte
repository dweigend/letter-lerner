<script lang="ts">
	import WordSlots from './WordSlots.svelte';
	import { floatEmoji, killAnimations } from '$lib/animations/gsap';

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

	let emojiElement: HTMLElement;

	$effect(() => {
		if (!emojiElement) return;

		floatEmoji(emojiElement);

		return () => {
			if (emojiElement) killAnimations(emojiElement);
		};
	});
</script>

<div class="game-board">
	<div bind:this={emojiElement} class="game-emoji">
		{emoji}
	</div>

	<WordSlots {word} {input} {shakeIndex} {isCelebrating} {onCelebrationComplete} />
</div>
