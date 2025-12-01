<script lang="ts">
	import { keySuccess, keyError, killAnimations } from '$lib/animations/gsap';

	let {
		key,
		isCorrect,
		isError,
		onclick
	}: {
		key: string;
		isCorrect: boolean;
		isError: boolean;
		onclick: () => void;
	} = $props();

	let buttonElement: HTMLElement;

	$effect(() => {
		if (!buttonElement) return;

		if (isCorrect) {
			keySuccess(buttonElement);
		} else if (isError) {
			keyError(buttonElement);
		}

		return () => {
			if (buttonElement) killAnimations(buttonElement);
		};
	});
</script>

<button
	bind:this={buttonElement}
	type="button"
	class="flex h-12 w-9 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold text-slate-700 shadow-md transition-all hover:scale-105 hover:bg-white active:scale-95 sm:h-14 sm:w-11 sm:text-xl"
	{onclick}
>
	{key}
</button>
