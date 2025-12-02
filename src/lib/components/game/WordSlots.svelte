<script lang="ts">
	import LetterSlot from './LetterSlot.svelte';
	import { triggerConfetti } from '$lib/animations/confetti';
	import { ANIMATION_TIMINGS } from '$lib/config/animations';
	import { withTimeout } from '$lib/utils/timeout';

	interface Props {
		word: string;
		input: string[];
		shakeIndex: number | null;
		isCelebrating?: boolean;
		onCelebrationComplete?: () => void;
	}

	const { word, input, shakeIndex, isCelebrating = false, onCelebrationComplete }: Props = $props();

	const indices = $derived(Array.from({ length: word.length }, (_, i) => i));

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

<div class="word-slots-container">
	{#each indices as i (`${word}-${i}`)}
		<LetterSlot
			letter={input[i] || ''}
			index={i}
			isFilled={input[i] !== ''}
			isShaking={shakeIndex === i}
			isCelebrating={isCelebrating && !isExiting}
			{isExiting}
		/>
	{/each}
</div>
