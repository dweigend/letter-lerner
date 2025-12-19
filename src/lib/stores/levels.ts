export interface Level {
	id: string;
	name: string;
	emoji: string;
	route: string;
	description: string;
	image: string;
	disabled?: boolean;
}

export const LEVELS: Level[] = [
	{
		id: 'puzzle',
		name: 'Buchstabenpuzzle',
		emoji: '🧩',
		route: '/level/puzzle',
		description: 'Ziehe die Buchstaben',
		image: '/images/menu/puzzle.png'
	},
	{
		id: 'lesen',
		name: 'Lesen',
		emoji: '📖',
		route: '/level/lesen',
		description: 'Finde das richtige Bild',
		image: '/images/menu/lesen.png'
	},
	{
		id: 'buchstabieren',
		name: 'Buchstabieren',
		emoji: '✏️',
		route: '/level/buchstabieren',
		description: 'Tippe die Buchstaben',
		image: '/images/menu/buchstabieren.png'
	}
];
