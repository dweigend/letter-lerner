import { describe, expect, it } from 'vitest';
import { Game } from './game.svelte';

const testWords = [
	{ word: 'HUND', emoji: '🐕' },
	{ word: 'KATZE', emoji: '🐈' }
];

describe('Game Store', () => {
	it('should initialize with first word', () => {
		const game = new Game(testWords);

		expect(game.word).toBe('HUND');
		expect(game.emoji).toBe('🐕');
		expect(game.index).toBe(0);
		expect(game.isComplete).toBe(false);
	});

	it('should handle correct input', () => {
		const game = new Game(testWords);

		game.handleInput('H');
		expect(game.input[0]).toBe('H');
		expect(game.lastKeyCorrect).toBe(true);
	});

	it('should handle incorrect input', () => {
		const game = new Game(testWords);

		game.handleInput('X');
		expect(game.input[0]).toBe('');
		expect(game.lastKeyCorrect).toBe(false);
		expect(game.shakeIndex).toBe(0);
	});

	it('should detect completion', () => {
		const game = new Game(testWords);

		game.handleInput('H');
		game.handleInput('U');
		game.handleInput('N');
		game.handleInput('D');

		expect(game.isComplete).toBe(true);
	});

	it('should advance to next level', () => {
		const game = new Game(testWords);

		game.nextLevel();

		expect(game.word).toBe('KATZE');
		expect(game.index).toBe(1);
	});

	it('should loop back to first word', () => {
		const game = new Game(testWords);

		game.nextLevel(); // KATZE
		game.nextLevel(); // back to HUND

		expect(game.word).toBe('HUND');
		expect(game.index).toBe(0);
	});

	it('should track celebration phase', () => {
		const game = new Game(testWords);

		expect(game.celebrationPhase).toBe(false);

		game.startCelebration();
		expect(game.celebrationPhase).toBe(true);

		game.endCelebration();
		expect(game.celebrationPhase).toBe(false);
		expect(game.word).toBe('KATZE'); // Should have advanced
	});

	it('should ignore input during celebration', () => {
		const game = new Game(testWords);
		game.startCelebration();

		game.handleInput('H');

		expect(game.input[0]).toBe(''); // Input ignored
	});

	it('should calculate progress', () => {
		const game = new Game(testWords);

		expect(game.progress).toBe(0);

		game.nextLevel();
		expect(game.progress).toBe(50);
	});
});
