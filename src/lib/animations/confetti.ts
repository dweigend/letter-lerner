import confetti from 'canvas-confetti';

// Confetti configuration
const CONFETTI_COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];

const CONFETTI_BASE = {
	spread: 360,
	ticks: 100,
	gravity: 0.5,
	decay: 0.94,
	startVelocity: 30,
	colors: CONFETTI_COLORS
} as const;

/**
 * Trigger celebration confetti (stars + circles)
 */
export function triggerConfetti(): void {
	confetti({ ...CONFETTI_BASE, shapes: ['star'], particleCount: 50, scalar: 1.2 });
	confetti({ ...CONFETTI_BASE, shapes: ['circle'], particleCount: 30, scalar: 0.75 });
}
