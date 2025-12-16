<script lang="ts">
	import { type DragDropState } from '@thisux/sveltednd';
	import type { PuzzleLetter, PuzzleSlot } from '$lib/stores/puzzle.svelte';
	import { triggerConfetti } from '$lib/animations/confetti';
	import { ANIMATION_TIMINGS } from '$lib/config/animations';
	import { withTimeout } from '$lib/utils/timeout';
	import DropSlot from './DropSlot.svelte';

	interface Props {
		slots: PuzzleSlot[];
		shakeIndex: number | null;
		isCelebrating?: boolean;
		onDrop: (state: DragDropState<PuzzleLetter>) => void;
		onCelebrationComplete?: () => void;
	}

	const {
		slots,
		shakeIndex,
		isCelebrating = false,
		onDrop,
		onCelebrationComplete
	}: Props = $props();

	let isExiting = $state(false);

	// Celebration flow: bounce → exit → complete
	$effect(() => {
		if (!isCelebrating) {
			isExiting = false;
			return;
		}

		triggerConfetti();

		const cleanup1 = withTimeout(() => {
			isExiting = true;
		}, ANIMATION_TIMINGS.CELEBRATION);

		const cleanup2 = withTimeout(() => {
			onCelebrationComplete?.();
		}, ANIMATION_TIMINGS.CELEBRATION + ANIMATION_TIMINGS.EXIT_DELAY);

		return () => {
			cleanup1();
			cleanup2();
		};
	});
</script>

<div data-drop-slots>
	{#each slots as slot (slot.index)}
		<DropSlot
			{slot}
			isShaking={shakeIndex === slot.index}
			isCelebrating={isCelebrating && !isExiting}
			{isExiting}
			{onDrop}
		/>
	{/each}
</div>
