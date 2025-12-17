type SoundName = 'correct' | 'error' | 'celebration' | 'click';

const sounds: Record<SoundName, HTMLAudioElement | null> = {
	correct: null,
	error: null,
	celebration: null,
	click: null
};

export function playSound(name: SoundName): void {
	if (typeof window === 'undefined') return;

	if (!sounds[name]) {
		sounds[name] = new Audio(`/sounds/${name}.mp3`);
	}

	const audio = sounds[name]!;
	audio.currentTime = 0;
	audio.play().catch(() => {});
}
