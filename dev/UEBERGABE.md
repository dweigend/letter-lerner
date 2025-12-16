# Übergabe: Letter-Lerner Multi-Level Feature

## Status: Phase 1+2 abgeschlossen

**Datum**: 2025-12-06
**Branch**: `feature/game-levels`

## Aktueller Stand

- [x] Projekt analysiert und verstanden
- [x] Drag-and-Drop Library recherchiert (@thisux/sveltednd)
- [x] Implementierungsplan erstellt (siehe PLAN.md)
- [x] Architektur-Prinzipien definiert (Clean Code, KISS, DRY)
- [x] Git Branch erstellt
- [x] Dependency installiert (@thisux/sveltednd)
- [x] **Phase 1+2: Infrastruktur & Route-Umstrukturierung abgeschlossen**
  - [x] Start-Menü mit Level-Auswahl erstellt
  - [x] Buchstabieren nach `/level/buchstabieren` verschoben
  - [x] Level-Layout mit shared Server Load für words.json
  - [x] Menu-Komponenten (LevelCard, LevelGrid)
  - [x] Level-Metadaten Store (levels.ts)
  - [x] CSS-Styles für Menu und Navigation
- [ ] Phase 3: Buchstabenpuzzle implementieren
- [ ] Phase 4: Lese-Level implementieren

## Neue Architektur

```
src/routes/
├── +page.svelte                    # Start-Menü (Level-Auswahl)
├── level/
│   ├── +layout.svelte              # Shared UI (Back-Button)
│   ├── +layout.server.ts           # Lädt words.json für alle Level
│   └── buchstabieren/
│       └── +page.svelte            # Buchstabieren-Spiel
└── admin/                          # Unverändert
```

## Neue Dateien

| Datei | Zweck |
|-------|-------|
| `src/routes/level/+layout.server.ts` | Lädt words.json für alle Level |
| `src/routes/level/+layout.svelte` | Shared UI mit "← Menu" Button |
| `src/routes/level/buchstabieren/+page.svelte` | Buchstabieren-Spiel |
| `src/lib/stores/levels.ts` | Level-Metadaten (Name, Emoji, Route) |
| `src/lib/components/menu/LevelCard.svelte` | Level-Karte |
| `src/lib/components/menu/LevelGrid.svelte` | Grid-Container |

## Nächste Schritte (Phase 3)

1. **Puzzle-Store erstellen**
   - `src/lib/stores/puzzle.svelte.ts`
   - Nutzt @thisux/sveltednd für Drag-and-Drop

2. **Puzzle-Komponenten erstellen**
   - `src/lib/components/puzzle/DraggableLetter.svelte`
   - `src/lib/components/puzzle/LetterPool.svelte`

3. **Puzzle-Route erstellen**
   - `src/routes/level/puzzle/+page.svelte`

## Projektkontext

### Tech Stack
- SvelteKit 2 + Svelte 5 (runes: $state, $derived, $effect)
- TypeScript, Tailwind CSS 4, bits-ui
- GSAP (minimal), canvas-confetti
- @thisux/sveltednd (Drag-and-Drop)

### Architektur-Prinzipien
- **Clean Code**: Lesbar, wartbar, selbstdokumentierend
- **Separation of Concerns**: UI, State, Logic getrennt
- **KISS**: Einfachste Lösung bevorzugen
- **DRY**: Vorhandenen Code wiederverwenden
- **Shared Data**: words.json via Layout Server Load

### Entwicklungsregeln
- **Code/Docs**: Englisch
- **Spiel-UI**: Deutsch
- **Daten**: `words.json` zentral via +layout.server.ts
- **Komponenten**: bits-ui durchgehend

### Wichtige Patterns
- **Styling**: Alle Styles in `app.css` mit data-attributes
- **State**: Svelte 5 runes mit Context API
- **Komponenten**: bits-ui (Button.Root, Progress.Root)
- **Data Loading**: Layout Server Load für shared data

## Level-Übersicht

| Level | Route | Status |
|-------|-------|--------|
| Buchstabieren | `/level/buchstabieren` | ✅ Implementiert |
| Buchstabenpuzzle | `/level/puzzle` | Nächste Phase |
| Lesen | `/level/lesen` | Geplant |

## Referenzen

- **Plan**: `dev/PLAN.md`
- **Workflow**: `dev/WORKFLOW.md`
- **Projekt-Readme**: `README.md`
- **Claude-Kontext**: `CLAUDE.md`
