<script lang="ts">
	import { LEVELS } from '$lib/stores/levels';
	import LevelCard from './LevelCard.svelte';
</script>

<div data-level-grid>
	{#each LEVELS as level (level.id)}
		<LevelCard {level} />
	{/each}
</div>
