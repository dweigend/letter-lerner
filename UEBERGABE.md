# Übergabe-Dokument: Bug-Fixes und Überarbeitung

## Identifizierte Bugs (Screenshot-Analyse)

### Bug 1: Tasten bleiben grün/leuchten nach Eingabe

**Symptom:** Die Tasten H, M, U zeigen dauerhaft grünes Feedback (boxShadow bleibt sichtbar)

**Ursache:**

- `keySuccess()` in `gsap.ts:52-65` setzt `boxShadow` und `scale` mit `yoyo: true, repeat: 1`
- Nach Animation wird der Endzustand NICHT zurückgesetzt
- GSAP `fromTo` Animation endet auf dem "from"-Wert bei yoyo, aber der boxShadow bleibt

**Lösung:**

```typescript
// In src/lib/animations/gsap.ts - keySuccess()
export function keySuccess(element: HTMLElement): gsap.core.Tween {
	return gsap.fromTo(
		element,
		{ boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)', scale: 1 },
		{
			boxShadow: '0 0 20px 5px rgba(34, 197, 94, 0.6)',
			scale: 1.1,
			duration: DURATIONS.keyFeedback / 2,
			yoyo: true,
			repeat: 1,
			ease: 'power2.out',
			onComplete: () => {
				// Explizit zurücksetzen nach Animation
				gsap.set(element, { boxShadow: 'none', scale: 1 });
			}
		}
	);
}
// Gleiches für keyError()
```

**Datei:** `src/lib/animations/gsap.ts:52-80`

---

### Bug 2: Unterstreichungen fehlen / sind inkonsistent

**Symptom:** Bunte Linien unter den Buchstaben-Slots (rot, türkis) statt einheitlicher Unterstreichung

**Ursache:**

- Die alte UI (`+page.svelte` vor Refactor) hatte eine separate `<div>` für die Unterstreichung:
  ```html
  <div class="mt-1 h-1 w-full rounded-full bg-slate-300"></div>
  ```
- Diese wurde bei der Komponenten-Extraktion NICHT in `LetterSlot.svelte` übernommen
- Die farbigen Linien im Screenshot sind wahrscheinlich Rest-Styles von GSAP-Animationen

**Lösung:**

```svelte
<!-- In src/lib/components/game/LetterSlot.svelte -->
<div bind:this={slotElement} class="flex flex-col items-center" data-index={index}>
	<div
		class="flex h-16 w-14 items-center justify-center rounded-2xl border-4 border-dashed text-3xl font-bold shadow-inner transition-colors sm:h-20 sm:w-16 sm:text-4xl
            {isFilled
			? 'border-green-300 bg-gradient-to-b from-green-50 to-green-100 text-green-600'
			: 'border-slate-300 bg-white/60 text-transparent'}"
	>
		{letter || '_'}
	</div>
	<!-- Unterstreichung hinzufügen -->
	<div
		class="mt-2 h-1 w-full rounded-full transition-all duration-300
            {isShaking
			? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]'
			: isFilled
				? 'bg-pink-400'
				: 'bg-slate-300'}"
	></div>
</div>
```

**Datei:** `src/lib/components/game/LetterSlot.svelte`

---

### Bug 3: GSAP-Styles werden nicht zurückgesetzt nach Celebration

**Symptom:** Nach der Celebration-Animation bleiben farbige Schatten/Styles auf den Elementen

**Ursache:**

- `celebrateLetter()` setzt `color`, `textShadow`, `scale`, etc.
- Nach Animation werden diese NICHT auf Ursprungswert zurückgesetzt
- `killAnimations()` stoppt nur laufende Tweens, setzt aber keine Styles zurück

**Lösung:**

```typescript
// In src/lib/animations/gsap.ts - celebrateAll()
export function celebrateAll(elements: HTMLElement[], onComplete?: () => void): gsap.core.Timeline {
	const masterTl = gsap.timeline({
		onComplete: () => {
			// Alle Styles zurücksetzen nach Celebration
			elements.forEach((el) => {
				gsap.set(el, { clearProps: 'all' });
			});
			if (onComplete) onComplete();
		}
	});
	// ... rest bleibt gleich
}
```

**Datei:** `src/lib/animations/gsap.ts:119-135`

---

### Bug 4: Potentieller State-Sync-Fehler

**Symptom:** Wort 5 (CAROLIN) zeigt 7 leere Slots aber keine Buchstaben

**Mögliche Ursache:**

- `hasAnimatedDrop` State in `LetterSlot.svelte` wird nicht korrekt zurückgesetzt bei Wortwechsel
- Der Slot-Key `(i)` in `WordSlots.svelte` könnte bei gleicher Wortlänge Probleme machen

**Lösung:**

```svelte
<!-- In src/lib/components/game/WordSlots.svelte -->
<!-- Key sollte word + index kombinieren um bei Wortwechsel neu zu rendern -->
{#each indices as i (`${word}-${i}`)}
```

**Datei:** `src/lib/components/game/WordSlots.svelte:45`

---

## Debugging-Plan

### Schritt 1: Key Feedback Fix

1. `git checkout -b fix/key-feedback-reset`
2. In `gsap.ts`: `onComplete` Callback zu `keySuccess()` und `keyError()` hinzufügen
3. Testen: Taste drücken → grün/rot blinken → zurück zu weiß
4. `pnpm check && pnpm lint && pnpm test:unit -- --run`

### Schritt 2: Unterstreichung wiederherstellen

1. In `LetterSlot.svelte`: Wrapper-Div + Unterstreichungs-Div hinzufügen
2. Shake-Animation auf inneres Element anwenden (nicht Wrapper)
3. Testen: Slots zeigen Unterstreichung (grau → pink bei gefüllt, rot bei Fehler)

### Schritt 3: Celebration Cleanup

1. In `gsap.ts`: `clearProps: 'all'` nach Celebration
2. Testen: Nach Celebration → nächstes Wort → keine Rest-Styles

### Schritt 4: State-Sync prüfen

1. Key in `WordSlots.svelte` ändern zu `${word}-${i}`
2. Testen: Wortwechsel → alle Slots leer → korrekte Darstellung

### Schritt 5: Visueller Test

1. `pnpm dev`
2. Durchspielen: Erstes Wort komplett → Celebration → nächstes Wort
3. Prüfen:
   - [ ] Tasten-Feedback verschwindet nach Animation
   - [ ] Unterstreichungen korrekt (grau/pink/rot)
   - [ ] Keine Rest-Styles nach Celebration
   - [ ] Wortwechsel funktioniert sauber

---

## Betroffene Dateien

| Datei                                       | Änderung                              |
| ------------------------------------------- | ------------------------------------- |
| `src/lib/animations/gsap.ts`                | `onComplete` Callbacks + `clearProps` |
| `src/lib/components/game/LetterSlot.svelte` | Unterstreichung hinzufügen            |
| `src/lib/components/game/WordSlots.svelte`  | Key-Pattern ändern                    |

---

## Test-Kommandos

```bash
# Type Check
pnpm check

# Lint
pnpm lint

# Unit Tests
pnpm test:unit -- --run

# Dev Server
pnpm dev
# Dann http://localhost:5173 öffnen und manuell testen
```
