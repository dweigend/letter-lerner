<script lang="ts">
	import { triggerConfetti } from '$lib/animations/confetti';
	import { ANIMATION_TIMINGS } from '$lib/config/animations';
	import { withTimeout } from '$lib/utils/timeout';
	import type { EmojiOption } from '$lib/stores/reading.svelte';
	import EmojiOptionComponent from './EmojiOption.svelte';

	interface Props {
		options: EmojiOption[];
		selectedId: string | null;
		shakeId: string | null;
		isCelebrating?: boolean;
		onSelect: (id: string) => void;
		onCelebrationComplete?: () => void;
	}

	const {
		options,
		selectedId,
		shakeId,
		isCelebrating = false,
		onSelect,
		onCelebrationComplete
	}: Props = $props();

	// Celebration flow: confetti → delay → complete
	$effect(() => {
		if (!isCelebrating) return;

		triggerConfetti();

		const cleanup = withTimeout(() => {
			onCelebrationComplete?.();
		}, ANIMATION_TIMINGS.CELEBRATION + ANIMATION_TIMINGS.EXIT_DELAY);

		return cleanup;
	});
</script>

<div data-emoji-grid>
	{#each options as option (option.id)}
		<EmojiOptionComponent
			{option}
			isShaking={shakeId === option.id}
			{isCelebrating}
			isSelected={selectedId === option.id}
			{onSelect}
		/>
	{/each}
</div>
