# Übergabe: Letter-Lerner Refactoring

## Status: Refactoring Phase 1 erledigt

**Datum:** 2025-12-19
**Branch:** `main`

---

## Nächste Session: Phase 2 - Code-Hygiene

**Workflow:**

1. Lese `dev/ARCHITECTURE.md` (Point of Truth)
2. Prüfe `git status`
3. Führe Phase 2 aus `dev/REFACTORING-PLAN.md` durch
4. Git Checkpoint

**Aufgaben:**

- [ ] Type-Duplikation bereinigen (`src/lib/data.ts`)
- [ ] Unused Dependencies entfernen (clsx, tailwind-merge, autoprefixer)
- [ ] Diese Datei nach Abschluss aktualisieren

---

## Refactoring-Plan

Siehe `dev/REFACTORING-PLAN.md` für den vollständigen Plan.

**3 Sessions geplant:**

| Session | Fokus                      | Status     |
| ------- | -------------------------- | ---------- |
| 1       | Docs als Point of Truth    | Erledigt   |
| 2       | Code-Hygiene (Types, Deps) | **NEXT**   |
| 3       | Store-Architektur Review   | Ausstehend |

---

## Projektkontext

### Tech Stack

- SvelteKit 2 + Svelte 5 (runes: $state, $derived, $effect)
- TypeScript, Tailwind CSS 4, bits-ui
- canvas-confetti, @thisux/sveltednd

### Architektur-Prinzipien

- **Point of Truth:** `dev/ARCHITECTURE.md`
- **Styling:** Alle Styles in `app.css` mit data-attributes
- **State:** Svelte 5 runes mit Context API
- **Philosophie:** Lesbarkeit > DRY

### Aktuelle Architektur

```
src/
├── routes/
│   ├── +page.svelte                    # Start-Menü
│   └── level/
│       ├── +layout.server.ts           # Lädt words.json
│       ├── buchstabieren/+page.svelte
│       ├── puzzle/+page.svelte
│       └── lesen/+page.svelte
├── lib/
│   ├── stores/
│   │   ├── game.svelte.ts              # Buchstabieren-Logic
│   │   ├── puzzle.svelte.ts            # Puzzle-Logic
│   │   ├── reading.svelte.ts           # Lesen-Logic
│   │   └── levels.ts                   # Level-Metadaten
│   ├── components/
│   │   ├── menu/                       # MenuScene, LevelItem
│   │   ├── game/                       # Buchstabieren-Komponenten
│   │   ├── puzzle/                     # Puzzle-Komponenten
│   │   └── reading/                    # Lesen-Komponenten
│   ├── data/
│   │   └── words.json                  # Wort-Datenbank
│   └── utils/
│       ├── array.ts                    # shuffleArray()
│       ├── audio.ts                    # playSound()
│       └── timeout.ts                  # withTimeout()
├── static/
│   ├── sounds/                         # Audio-Dateien
│   └── images/menu/                    # Menü-Assets
└── app.css                             # Alle Styles
```

---

## Referenzen

- **Claude-Kontext:** `CLAUDE.md`
- **Architektur:** `dev/ARCHITECTURE.md`
- **Roadmap:** `dev/ROADMAP.md`
- **Refactoring-Plan:** `dev/REFACTORING-PLAN.md`
