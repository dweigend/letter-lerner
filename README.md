# Letter-Lerner

A German spelling learning app for my daughter Annelie, built with SvelteKit 2 and Svelte 5.

## About This Project

My daughter Annelie is learning to write. To support her learning journey, I'm developing this simple spelling program that we'll grow together over time.

**Important:** This game is designed to be played **together with parents**, not alone. Parents help children find the letters on the keyboard and guide them through the learning process.

## Current Features (Level 1)

- Emoji-based word learning: An emoji appears, child types the matching word
- QWERTZ keyboard (on-screen + physical keyboard support)
- Visual feedback: keys flash green (correct) or red (wrong)
- Minimal, distraction-free UI
- Celebration animations with bouncing letters and confetti
- Admin panel to manage word list

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Open http://localhost:5173
```

## Commands

| Command      | Description       |
| ------------ | ----------------- |
| `bun dev`    | Start dev server  |
| `bun build`  | Production build  |
| `bun check`  | TypeScript check  |
| `bun lint`   | Prettier + ESLint |
| `bun format` | Auto-format code  |

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 5 (runes)
- **Styling:** Tailwind CSS 4 + bits-ui (headless components)
- **Animations:** CSS-first animations (no heavy dependencies)
- **Effects:** canvas-confetti

## Project Structure

```
src/
├── app.css                    # All styles + animation config
├── lib/
│   ├── animations/confetti.ts # Celebration confetti
│   ├── components/
│   │   ├── game/              # GameBoard, LetterSlot, WordSlots
│   │   └── keyboard/          # Keyboard, KeyButton
│   ├── config/                # Animation timings
│   ├── stores/                # Game state (Svelte 5 runes)
│   └── utils/                 # Shared utilities
└── routes/
    ├── +page.svelte           # Main game
    └── admin/                 # Word management
```

## Animation Configuration

All animation parameters are configurable in `app.css`:

```css
:root {
	--anim-bounce: 1.5s;
	--anim-exit: 0.6s;
	--bounce-height-max: -50px;
	--color-success: #22c55e;
	--color-error: #ef4444;
}
```

## Routes

- `/` - Main spelling game
- `/admin` - Add/remove words from the word list

## Philosophy

This project prioritizes:

- **Simplicity** - Clean, distraction-free interface for young learners
- **Parental Involvement** - Designed for parent-child interaction
- **Gradual Growth** - Features expand as Annelie's skills develop
- **Joy of Learning** - Celebrations and positive feedback at every step

## Development

Built with modern web technologies and best practices:

- CSS-first animations for performance
- Centralized configuration for easy tuning
- Type-safe with TypeScript
- Component-driven architecture with bits-ui

## Roadmap

The app is intentionally kept simple now, but I plan to continuously expand it with:

- **AI & Voice Output** - Spoken letter and word assistance
- **Automatic Spelling Help** - Smart guidance for difficult words
- **Targeted Support** - Adaptive help based on learning progress
- **Progress Tracking** - Automatic monitoring of learning achievements
- **Keyboard Orientation** - Mini-levels to improve keyboard familiarity
- **Sentence Writing** - Progress from words to simple sentences
- **Listening & Writing** - Audio-based spelling exercises
- **Reading Practice** - Building reading comprehension skills

## License

MIT

---

Made with ❤️ for Annelie's learning journey
