<script lang="ts">
	import LetterSlot from './LetterSlot.svelte';
	import { celebrateAll, killAnimations } from '$lib/animations/gsap';

	let {
		word,
		input,
		shakeIndex,
		isCelebrating = false,
		onCelebrationComplete
	}: {
		word: string;
		input: string[];
		shakeIndex: number | null;
		isCelebrating?: boolean;
		onCelebrationComplete?: () => void;
	} = $props();

	let containerElement: HTMLElement;

	const indices = $derived(Array.from({ length: word.length }, (_, i) => i));

	$effect(() => {
		if (!isCelebrating || !containerElement) return;

		const letterElements = containerElement.querySelectorAll('[data-index]');
		const elements = Array.from(letterElements) as HTMLElement[];

		if (elements.length > 0) {
			celebrateAll(elements, onCelebrationComplete);
		}

		return () => {
			if (elements.length > 0) {
				killAnimations(elements);
			}
		};
	});
</script>

<div
	bind:this={containerElement}
	class="flex flex-wrap justify-center gap-2 rounded-3xl bg-white/40 p-6 shadow-lg backdrop-blur-sm sm:gap-3"
>
	{#each indices as i (i)}
		<LetterSlot
			letter={input[i] || ''}
			index={i}
			isFilled={input[i] !== ''}
			isShaking={shakeIndex === i}
			{isCelebrating}
		/>
	{/each}
</div>
