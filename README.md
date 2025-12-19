# Letter-Lerner 🦄

<p align="center">
  <img src="docs/images/hero.png" alt="Letter-Lerner" width="600">
</p>

## What is Letter-Lerner? ✨

My daughter Annelie is learning to write. To support her learning journey, I'm developing this simple spelling program that we'll grow together over time.

**Important:** This game is designed to be played **together with parents**, not alone. Parents help children find the letters on the keyboard and guide them through the learning process. 👨‍👩‍👧

### The Three Game Modes 🎮

| Level                   | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| 🔤 **Buchstabieren**    | An emoji appears, the child types the word letter by letter |
| 🧩 **Buchstabenpuzzle** | Drag & drop letters into the correct order                  |
| 📖 **Lesen**            | The word appears, the child picks the matching emoji        |

## Installation 🚀

```bash
# Clone the repository
git clone https://github.com/dweigend/letter-lerner.git
cd letter-lerner

# Install dependencies
bun install

# Start development server
bun dev
```

Then open in browser: [http://localhost:5173](http://localhost:5173)

## Tech Stack 🛠️

- **[SvelteKit 2](https://kit.svelte.dev/)** + **[Svelte 5](https://svelte.dev/)** - Frontend framework with runes
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling
- **[bits-ui](https://bits-ui.com/)** - Headless UI components
- **[@thisux/sveltednd](https://github.com/thisuxhq/sveltednd)** - Drag & drop for the puzzle
- **[canvas-confetti](https://github.com/catdad/canvas-confetti)** - Confetti fireworks on success 🎉

## Project Structure 📁

```
letter-lerner/
├── src/
│   ├── routes/
│   │   ├── +page.svelte              # 🏠 Start menu
│   │   └── level/
│   │       ├── buchstabieren/        # 🔤 Spelling level
│   │       ├── puzzle/               # 🧩 Puzzle level
│   │       └── lesen/                # 📖 Reading level
│   ├── lib/
│   │   ├── components/               # UI components
│   │   ├── stores/                   # Game state (Svelte 5 runes)
│   │   └── data/words.json           # 📝 Word list
│   └── app.css                       # 🎨 All styles
├── dev/                              # 📚 Developer documentation
│   ├── ARCHITECTURE.md               # Technical details
│   └── ROADMAP.md                    # Planned features
└── static/sounds/                    # 🔊 Audio files
```

## Development 💻

| Command     | Description              |
| ----------- | ------------------------ |
| `bun dev`   | Start development server |
| `bun build` | Production build         |
| `bun check` | TypeScript check         |
| `bun lint`  | Format code              |

## License 📄

MIT

---

Made with ❤️ for Annelie's learning journey
