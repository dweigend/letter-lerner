# Annelies Schreib-Spass

A German spelling game for children built with SvelteKit 2 and Svelte 5.

## Features

- Type letters via on-screen QWERTZ keyboard or physical keyboard
- Visual feedback: keys flash green (correct) or red (wrong)
- Minimal UI: letters appear above simple underlines
- Celebration animation with bouncing letters and confetti
- Admin panel to manage word list

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173
```

## Commands

| Command       | Description       |
| ------------- | ----------------- |
| `pnpm dev`    | Start dev server  |
| `pnpm build`  | Production build  |
| `pnpm check`  | TypeScript check  |
| `pnpm lint`   | Prettier + ESLint |
| `pnpm format` | Auto-format code  |

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 5 (runes)
- **Styling:** Tailwind CSS 4 + bits-ui
- **Animations:** CSS animations + GSAP (minimal)
- **Effects:** canvas-confetti

## Project Structure

```
src/
├── app.css                 # All styles + animation config
├── lib/
│   ├── animations/gsap.ts  # floatEmoji + confetti only
│   ├── components/
│   │   ├── game/           # GameBoard, LetterSlot, WordSlots
│   │   └── keyboard/       # Keyboard, KeyButton
│   └── stores/             # Game state (Svelte 5 runes)
└── routes/
    ├── +page.svelte        # Main game
    └── admin/              # Word management
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

## AI/LLM Configuration

See [docs/AGENTS.md](docs/AGENTS.md) for coding assistant configuration.

## License

MIT
