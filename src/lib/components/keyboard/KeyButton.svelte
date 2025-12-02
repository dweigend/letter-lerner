<script lang="ts">
	import { Button } from 'bits-ui';
	import { ANIMATION_TIMINGS } from '$lib/config/animations';
	import { withTimeout } from '$lib/utils/timeout';

	interface Props {
		key: string;
		isCorrect: boolean;
		isError: boolean;
		onclick: () => void;
	}

	const { key, isCorrect, isError, onclick }: Props = $props();

	type FeedbackState = 'success' | 'error' | null;
	let feedback: FeedbackState = $state(null);

	// Show visual feedback briefly on correct/error input
	$effect(() => {
		if (isCorrect) {
			feedback = 'success';
			return withTimeout(() => (feedback = null), ANIMATION_TIMINGS.KEY_FEEDBACK);
		} else if (isError) {
			feedback = 'error';
			return withTimeout(() => (feedback = null), ANIMATION_TIMINGS.KEY_FEEDBACK);
		}
	});
</script>

<Button.Root data-variant="key" data-feedback={feedback} {onclick}>
	{key}
</Button.Root>
