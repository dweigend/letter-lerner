# Übergabe: Letter-Lerner Multi-Level Feature

## Status: Phase 7 abgeschlossen ✅

**Datum**: 2025-12-19
**Branch**: `main`

## Abgeschlossene Phasen

- [x] **Phase 1+2**: Infrastruktur & Route-Umstrukturierung
- [x] **Phase 3**: Buchstabenpuzzle (Drag-and-Drop)
- [x] **Phase 4**: Lese-Level (Emoji-Auswahl)
- [x] **Phase 5**: Wörter Randomisieren
- [x] **Phase 6**: Sound-System
- [x] **Phase 7**: Neues Startmenü (bildbasiert)

## Level-Übersicht

| Level            | Route                  | Status           |
| ---------------- | ---------------------- | ---------------- |
| Buchstabieren    | `/level/buchstabieren` | ✅ Implementiert |
| Buchstabenpuzzle | `/level/puzzle`        | ✅ Implementiert |
| Lesen            | `/level/lesen`         | ✅ Implementiert |

---

# Nächste Phasen

## Phase 5: Wörter Randomisieren ✅

Implementiert in `src/routes/level/+layout.server.ts` - Wörter werden bei jedem Seitenaufruf randomisiert.

---

## Phase 6: Sound-System ✅ Implementiert

Audio-Feedback in allen 3 Levels implementiert.

### Audio-Dateien

| Datei             | Zweck  | Wann gespielt                           |
| ----------------- | ------ | --------------------------------------- |
| `click.mp3`       | Klick  | Buchstabieren: richtiger Buchstabe      |
| `correct.mp3`     | Erfolg | Puzzle/Lesen: richtiger Buchstabe/Emoji |
| `error.mp3`       | Fehler | Alle Levels: falscher Buchstabe/Emoji   |
| `celebration.mp3` | Feier  | Alle Levels: Wort abgeschlossen         |
| `click_2.mp3`     | Klick  | (optional) Alternative                  |

**Ablageort**: `static/sounds/`

### Implementierte Dateien

- `src/lib/utils/audio.ts` - Audio-Utility mit `playSound()`
- `src/lib/stores/game.svelte.ts` - Sounds integriert
- `src/lib/stores/puzzle.svelte.ts` - Sounds integriert
- `src/lib/stores/reading.svelte.ts` - Sounds integriert

---

## Phase 7: Neues Startmenü ✅ Implementiert

Bildbasiertes Startmenü mit 3D-Assets (Einhorn-Maskottchen, Holztheke, Level-Objekte).

### Layering-Konzept

```
z-index: 0  │ Background (Klassenzimmer)
z-index: 2  │ Einhorn (mittig, hinter Items)
z-index: 2  │ Theke (volle Breite)
z-index: 4  │ Level-Items (klickbar)
```

### Assets

| Datei               | Dimension | Zweck                     |
| ------------------- | --------- | ------------------------- |
| `background.png`    | 2784×1536 | Klassenzimmer-Hintergrund |
| `einhorn.png`       | 563×1276  | Maskottchen               |
| `theke.png`         | 2784×271  | Holztheke                 |
| `puzzle.png`        | 721×491   | Level: Puzzle             |
| `lesen.png`         | 760×502   | Level: Lesen              |
| `buchstabieren.png` | 775×492   | Level: Buchstabieren      |

**Ablageort**: `static/images/menu/`

### Implementierte Dateien

| Datei                                      | Zweck                     |
| ------------------------------------------ | ------------------------- |
| `src/routes/+page.svelte`                  | Lädt MenuScene            |
| `src/lib/components/menu/MenuScene.svelte` | Szenen-Container (Layer)  |
| `src/lib/components/menu/LevelItem.svelte` | Klickbares Level-Bild     |
| `src/lib/stores/levels.ts`                 | Level-Metadaten + `image` |
| `src/app.css`                              | Styles (`[data-menu-*]`)  |

### Hover-Effekte

- CSS-only: `scale(1.08) translateY(-8px)`
- Video-basierte Hover geplant für später

---

# Projektkontext

## Tech Stack

- SvelteKit 2 + Svelte 5 (runes: $state, $derived, $effect)
- TypeScript, Tailwind CSS 4, bits-ui
- canvas-confetti, @thisux/sveltednd

## Architektur-Prinzipien

- **Styling**: Alle Styles in `app.css` mit data-attributes
- **State**: Svelte 5 runes mit Context API
- **Utilities**: Wiederverwendbare Funktionen in `src/lib/utils/`
- **Data Loading**: Layout Server Load für shared data

## Aktuelle Architektur

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
│   │   └── reading.svelte.ts           # Lesen-Logic
│   ├── components/
│   │   ├── menu/                       # MenuScene, LevelItem (Phase 7)
│   │   ├── game/                       # Buchstabieren-Komponenten
│   │   ├── puzzle/                     # Puzzle-Komponenten
│   │   └── reading/                    # Lesen-Komponenten
│   ├── data/
│   │   └── words.json                  # Wort-Datenbank
│   └── utils/
│       ├── array.ts                    # shuffleArray()
│       ├── audio.ts                    # playSound() (Phase 6)
│       └── timeout.ts                  # withTimeout()
├── static/
│   ├── sounds/                         # Audio-Dateien (Phase 6)
│   └── images/menu/                    # Menü-Assets (Phase 7)
└── app.css                             # Alle Styles
```

## Referenzen

- **Claude-Kontext**: `CLAUDE.md`
- **Architektur**: `dev/ARCHITECTURE.md`
- **Roadmap**: `dev/ROADMAP.md`

---

## Refactoring-Notizen

Bei zukünftigen Änderungen berücksichtigen:

| Item                | Beschreibung                                              |
| ------------------- | --------------------------------------------------------- |
| Animation-Timing    | `SHAKE: 500ms` → `400ms` (match CSS `--anim-shake`)       |
| Unused Dependencies | `clsx`, `tailwind-merge`, `autoprefixer` entfernen        |
| Types konsolidieren | `PuzzleLetter`, `EmojiOption` nach `types.ts` verschieben |
| BaseGame-Klasse     | Gemeinsame Store-Logik extrahieren bei Level 4+           |
