<script lang="ts">
	import { shakeElement, dropLetter, killAnimations } from '$lib/animations/gsap';

	let {
		letter,
		index,
		isFilled,
		isShaking,
		isCelebrating = false
	}: {
		letter: string;
		index: number;
		isFilled: boolean;
		isShaking: boolean;
		isCelebrating?: boolean;
	} = $props();

	let slotElement: HTMLElement;
	let hasAnimatedDrop = $state(false);

	$effect(() => {
		if (!slotElement) return;

		if (isShaking) {
			shakeElement(slotElement);
		}

		return () => {
			if (slotElement) killAnimations(slotElement);
		};
	});

	$effect(() => {
		if (!slotElement) return;

		if (isFilled && !hasAnimatedDrop) {
			dropLetter(slotElement);
			hasAnimatedDrop = true;
		}

		if (!isFilled) {
			hasAnimatedDrop = false;
		}
	});
</script>

<div
	bind:this={slotElement}
	class="flex h-16 w-14 items-center justify-center rounded-2xl border-4 border-dashed text-3xl font-bold shadow-inner transition-colors sm:h-20 sm:w-16 sm:text-4xl
		{isFilled
		? 'border-green-300 bg-gradient-to-b from-green-50 to-green-100 text-green-600'
		: 'border-slate-300 bg-white/60 text-transparent'}
		{isCelebrating ? 'letter-celebrating' : ''}"
	data-index={index}
>
	{letter || '_'}
</div>
