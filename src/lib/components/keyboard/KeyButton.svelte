<script lang="ts">
	import { Button } from 'bits-ui';

	interface Props {
		key: string;
		isCorrect: boolean;
		isError: boolean;
		onclick: () => void;
	}

	const { key, isCorrect, isError, onclick }: Props = $props();

	// Derive feedback directly from props (Game store handles timing)
	const feedback = $derived(isCorrect ? 'success' : isError ? 'error' : null);
</script>

<Button.Root data-variant="key" data-feedback={feedback} {onclick}>
	{key}
</Button.Root>
