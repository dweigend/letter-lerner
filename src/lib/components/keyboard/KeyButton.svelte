<script lang="ts">
	import { Button } from 'bits-ui';

	// Feedback display duration (ms)
	const FEEDBACK_DURATION = 400;

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
			setTimeout(() => (feedback = null), FEEDBACK_DURATION);
		} else if (isError) {
			feedback = 'error';
			setTimeout(() => (feedback = null), FEEDBACK_DURATION);
		}
	});
</script>

<Button.Root data-variant="key" data-feedback={feedback} {onclick}>
	{key}
</Button.Root>
