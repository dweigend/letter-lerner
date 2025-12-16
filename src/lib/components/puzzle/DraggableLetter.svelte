<script lang="ts">
	import { draggable } from '@thisux/sveltednd';
	import type { PuzzleLetter } from '$lib/stores/puzzle.svelte';

	interface Props {
		letter: PuzzleLetter;
		container: string;
		isCelebrating?: boolean;
		isExiting?: boolean;
		animationDelay?: number;
	}

	const {
		letter,
		container,
		isCelebrating = false,
		isExiting = false,
		animationDelay = 0
	}: Props = $props();

	const delayStyle = $derived(`animation-delay: ${animationDelay}s`);
</script>

<div
	use:draggable={{ container, dragData: letter }}
	data-puzzle-letter
	class:letter-celebrating={isCelebrating}
	class:letter-exiting={isExiting}
	style={delayStyle}
>
	{letter.letter}
</div>
