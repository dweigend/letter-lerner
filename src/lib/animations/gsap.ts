import { gsap } from 'gsap';
import confetti from 'canvas-confetti';

// Animation durations
export const DURATIONS = {
	shake: 0.4,
	drop: 0.4,
	keyFeedback: 0.4,
	celebration: 2,
	celebrationDelay: 0.1 // stagger delay between letters
} as const;

// Shake animation for wrong input
export function shakeElement(element: HTMLElement): gsap.core.Tween {
	return gsap.to(element, {
		keyframes: [
			{ x: -10, duration: 0.05 },
			{ x: 10, duration: 0.05 },
			{ x: -8, duration: 0.05 },
			{ x: 8, duration: 0.05 },
			{ x: -5, duration: 0.05 },
			{ x: 5, duration: 0.05 },
			{ x: 0, duration: 0.05 }
		],
		ease: 'power1.inOut'
	});
}

// Letter drop animation when correct
export function dropLetter(element: HTMLElement): gsap.core.Tween {
	gsap.set(element, { y: -50, opacity: 0 });
	return gsap.to(element, {
		y: 0,
		opacity: 1,
		duration: DURATIONS.drop,
		ease: 'bounce.out'
	});
}

// Floating emoji animation
export function floatEmoji(element: HTMLElement): gsap.core.Tween {
	return gsap.to(element, {
		y: '-=10',
		duration: 1.5,
		ease: 'sine.inOut',
		yoyo: true,
		repeat: -1
	});
}

// Key feedback animation (correct)
export function keySuccess(element: HTMLElement): gsap.core.Tween {
	return gsap.fromTo(
		element,
		{ boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
		{
			boxShadow: '0 0 20px 5px rgba(34, 197, 94, 0.6)',
			scale: 1.1,
			duration: DURATIONS.keyFeedback / 2,
			yoyo: true,
			repeat: 1,
			ease: 'power2.out'
		}
	);
}

// Key feedback animation (error)
export function keyError(element: HTMLElement): gsap.core.Tween {
	return gsap.fromTo(
		element,
		{ boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
		{
			boxShadow: '0 0 20px 5px rgba(239, 68, 68, 0.6)',
			scale: 1.1,
			duration: DURATIONS.keyFeedback / 2,
			yoyo: true,
			repeat: 1,
			ease: 'power2.out'
		}
	);
}

// Celebration dance for individual letter
export function celebrateLetter(element: HTMLElement, index: number): gsap.core.Timeline {
	const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'];
	const color = colors[index % colors.length];

	const tl = gsap.timeline({ delay: index * DURATIONS.celebrationDelay });

	tl.to(element, {
		y: -30,
		rotation: 360,
		scale: 1.3,
		color: color,
		duration: 0.4,
		ease: 'back.out(2)'
	})
		.to(element, {
			y: 0,
			rotation: 0,
			scale: 1,
			duration: 0.3,
			ease: 'bounce.out'
		})
		.to(
			element,
			{
				textShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
				duration: 0.2,
				yoyo: true,
				repeat: 3
			},
			'-=0.2'
		);

	return tl;
}

// Full celebration sequence for all letters
export function celebrateAll(elements: HTMLElement[], onComplete?: () => void): gsap.core.Timeline {
	const masterTl = gsap.timeline({
		onComplete: () => {
			if (onComplete) onComplete();
		}
	});

	elements.forEach((el, i) => {
		masterTl.add(celebrateLetter(el, i), i * DURATIONS.celebrationDelay);
	});

	// Trigger confetti near the end
	masterTl.call(triggerConfetti, [], elements.length * DURATIONS.celebrationDelay + 0.3);

	return masterTl;
}

// Confetti effect
export function triggerConfetti(): void {
	confetti({
		spread: 360,
		ticks: 100,
		gravity: 0.5,
		decay: 0.94,
		startVelocity: 30,
		shapes: ['star'],
		colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
		particleCount: 50,
		scalar: 1.2
	});

	confetti({
		spread: 360,
		ticks: 100,
		gravity: 0.5,
		decay: 0.94,
		startVelocity: 30,
		shapes: ['circle'],
		colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
		particleCount: 30,
		scalar: 0.75
	});
}

// Kill all GSAP animations on elements (for cleanup)
export function killAnimations(elements: HTMLElement | HTMLElement[]): void {
	gsap.killTweensOf(elements);
}

// Reset element styles after animation
export function resetElement(element: HTMLElement): void {
	gsap.set(element, {
		clearProps: 'all'
	});
}
