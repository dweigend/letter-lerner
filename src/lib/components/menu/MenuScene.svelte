<script lang="ts">
	import { LEVELS } from '$lib/stores/levels';
	import LevelItem from './LevelItem.svelte';
</script>

<div data-menu-scene>
	<div data-menu-background></div>
	<div data-menu-mascot></div>
	<div data-menu-counter></div>
	<div data-menu-items>
		{#each LEVELS as level (level.id)}
			<LevelItem {level} />
		{/each}
	</div>
</div>
