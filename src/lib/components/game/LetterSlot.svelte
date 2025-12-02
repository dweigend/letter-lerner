<script lang="ts">
	interface Props {
		letter: string;
		index: number;
		isFilled: boolean;
		isShaking: boolean;
		isCelebrating?: boolean;
		isExiting?: boolean;
	}

	const {
		letter,
		index,
		isFilled,
		isShaking,
		isCelebrating = false,
		isExiting = false
	}: Props = $props();

	// Derive underline state from current letter status
	const underlineState = $derived(isShaking ? 'error' : isFilled ? 'filled' : 'empty');

	// Stagger animation delay per letter (uses --anim-stagger-delay from CSS)
	const animationDelay = $derived(`${index * 0.1}s`);
</script>

<div class="letter-slot-container" data-index={index}>
	<span
		class="letter-char"
		class:letter-celebrating={isCelebrating}
		class:letter-exiting={isExiting}
		data-filled={isFilled}
		data-shaking={isShaking}
		style:animation-delay={isCelebrating || isExiting ? animationDelay : '0s'}
	>
		{letter || ''}
	</span>
	<div class="letter-underline" data-state={underlineState}></div>
</div>
