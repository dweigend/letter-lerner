<script lang="ts">
	import { droppable, type DragDropState } from '@thisux/sveltednd';
	import type { PuzzleLetter } from '$lib/stores/puzzle.svelte';
	import DraggableLetter from './DraggableLetter.svelte';

	interface Props {
		letters: PuzzleLetter[];
		onReturnToPool: (state: DragDropState<PuzzleLetter>) => void;
	}

	const { letters, onReturnToPool }: Props = $props();
</script>

<div use:droppable={{ container: 'pool', callbacks: { onDrop: onReturnToPool } }} data-letter-pool>
	{#each letters as letter (letter.id)}
		<DraggableLetter {letter} container="pool" />
	{/each}
</div>
