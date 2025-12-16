<script lang="ts">
	import { Button } from 'bits-ui';
	import type { EmojiOption } from '$lib/stores/reading.svelte';

	interface Props {
		option: EmojiOption;
		isShaking: boolean;
		isCelebrating?: boolean;
		isSelected?: boolean;
		onSelect: (id: string) => void;
	}

	const {
		option,
		isShaking,
		isCelebrating = false,
		isSelected = false,
		onSelect
	}: Props = $props();
</script>

<Button.Root
	data-reading-option
	data-shaking={isShaking}
	data-celebrating={isCelebrating && isSelected}
	data-correct={isCelebrating && option.isCorrect}
	onclick={() => onSelect(option.id)}
>
	{option.emoji}
</Button.Root>
