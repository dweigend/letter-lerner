/**
 * Animation timing constants
 *
 * These values are synced with CSS variables in app.css:
 * - --anim-shake (0.4s = 400ms)
 * - --anim-bounce (1.5s = 1500ms)
 * - --anim-exit (0.6s = 600ms)
 */
export const ANIMATION_TIMINGS = {
	/** Error shake animation duration */
	SHAKE: 500,
	/** Key press feedback duration */
	KEY_FEEDBACK: 400,
	/** Word completion celebration duration */
	CELEBRATION: 1500,
	/** Delay before transitioning to next word after celebration */
	EXIT_DELAY: 1300
} as const;
