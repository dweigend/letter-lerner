import { WORDS } from './data';

export class Game {
    index = $state(0);
    input = $state<string[]>([]);
    shakeIndex = $state<number | null>(null);
    
    // Derived state for the current target word and emoji
    currentLevel = $derived(WORDS[this.index]);
    word = $derived(this.currentLevel.word);
    emoji = $derived(this.currentLevel.emoji);
    
    // Check if the current word is fully completed
    isComplete = $derived(this.input.join('') === this.word);
    
    // Helper for progress bar or UI
    progress = $derived(((this.index) / WORDS.length) * 100);

    constructor() {
        this.resetInput();
    }

    resetInput() {
        this.input = new Array(this.word.length).fill('');
        this.shakeIndex = null;
    }

    nextLevel() {
        if (this.index < WORDS.length - 1) {
            this.index += 1;
            this.resetInput();
        } else {
            // Restart game or show final screen (for now loop or stay)
            this.index = 0;
            this.resetInput();
        }
    }

    handleInput(char: string) {
        if (this.isComplete) return;

        const upperChar = char.toUpperCase();
        
        // Find the first empty slot
        const firstEmptyIndex = this.input.findIndex(c => c === '');
        
        if (firstEmptyIndex === -1) return; // Word full but not confirmed? (Shouldn't happen if isComplete works)

        // Check if the input matches the target character at that position
        const targetChar = this.word[firstEmptyIndex];

        if (upperChar === targetChar) {
            // Correct! Fill the slot
            const newInput = [...this.input];
            newInput[firstEmptyIndex] = upperChar;
            this.input = newInput;
            this.shakeIndex = null;
        } else {
            // Incorrect! Shake effect
            this.shakeIndex = firstEmptyIndex;
            // Reset shake after animation duration (approx 500ms)
            setTimeout(() => {
                this.shakeIndex = null;
            }, 500);
        }
    }
}

// Create a global instance or factory if needed. 
// For this app, a factory function is good, or just exporting the class.
export const createGame = () => new Game();
