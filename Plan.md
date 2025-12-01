# Entwicklungsplan: Annelies Schreib-Spass

## Abgeschlossene Phasen

### Phase 1: Fundament

- [x] Git Checkpoint vor Refactor
- [x] JSON-Datenstruktur (`src/lib/data/words.json`)
- [x] TypeScript Types (`src/lib/types.ts`)
- [x] Server-seitige Datenlogik (`+page.server.ts`)

### Phase 2: State Management

- [x] Neuer Game Store mit Context Pattern (`src/lib/stores/game.svelte.ts`)
- [x] Words Store (`src/lib/stores/words.svelte.ts`)
- [x] CelebrationPhase State für Erfolgsanimation

### Phase 3: GSAP Integration

- [x] GSAP installiert
- [x] Zentrale Animation-Funktionen (`src/lib/animations/gsap.ts`)
- [x] CSS Keyframes entfernt
- [x] Animationen: shake, drop, float, keyFeedback, celebration

### Phase 4: Komponenten-Extraktion

- [x] LetterSlot - Einzelner Buchstaben-Slot
- [x] WordSlots - Container für alle Slots
- [x] KeyButton - Einzelne Taste
- [x] Keyboard - QWERTZ Layout
- [x] GameBoard - Emoji + WordSlots
- [x] ProgressBar - Fortschrittsanzeige

### Phase 5: Erfolgs-Animation

- [x] Neuer Flow: Wort fertig → Buchstaben tanzen → Konfetti → nächstes Wort
- [x] Dialog entfernt (kein Popup mehr)
- [x] GSAP Timeline für Celebration

### Phase 6: Haupt-Seite Refactor

- [x] +page.svelte von 198 auf 48 Zeilen reduziert
- [x] Alle neuen Komponenten integriert
- [x] Server-Daten-Loading

### Phase 7: Admin-Backend

- [x] WordForm Komponente
- [x] WordList Komponente
- [x] Admin Page (`/admin`)
- [x] CRUD Actions (add, delete, update)

### Phase 8: Dokumentation

- [x] CLAUDE.md aktualisiert
- [x] Plan.md erstellt

## Zukünftige Verbesserungen

### Funktionalität

- [ ] Schwierigkeitsgrade (kurze/lange Wörter)
- [ ] Soundeffekte für Feedback
- [ ] Statistiken (richtige Wörter, Fehler)
- [ ] Mehrere Wortlisten/Kategorien

### Admin

- [ ] Passwortschutz für Admin-Bereich
- [ ] Wort-Reihenfolge anpassen
- [ ] Wörter importieren/exportieren
- [ ] Emoji-Picker

### UX

- [ ] Onboarding/Tutorial für Kinder
- [ ] Tastatur-Shortcuts anzeigen
- [ ] Animationsgeschwindigkeit einstellbar
- [ ] Dark Mode

### Technisch

- [ ] E2E Tests mit Playwright
- [ ] Unit Tests für Game Store
- [ ] Component Tests
- [ ] PWA Support für Offline-Nutzung
