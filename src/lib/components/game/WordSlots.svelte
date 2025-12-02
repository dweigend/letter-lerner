<script lang="ts">
	import LetterSlot from './LetterSlot.svelte';
	import { triggerConfetti } from '$lib/animations/gsap';

	// Celebration timing (in ms) - adjust these to change animation flow
	const CELEBRATION_DURATION = 1500; // How long letters bounce
	const EXIT_TO_COMPLETE_DELAY = 1300; // Time after exit starts until next word

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

		const exitTimer = setTimeout(() => {
			isExiting = true;
		}, CELEBRATION_DURATION);

		const completeTimer = setTimeout(() => {
			onCelebrationComplete?.();
		}, CELEBRATION_DURATION + EXIT_TO_COMPLETE_DELAY);

		return () => {
			clearTimeout(exitTimer);
			clearTimeout(completeTimer);
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
