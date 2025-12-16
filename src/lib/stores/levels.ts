export interface Level {
	id: string;
	name: string;
	emoji: string;
	route: string;
	description: string;
	disabled?: boolean;
}

export const LEVELS: Level[] = [
	{
		id: 'buchstabieren',
		name: 'Buchstabieren',
		emoji: '✏️',
		route: '/level/buchstabieren',
		description: 'Tippe die Buchstaben'
	},
	{
		id: 'puzzle',
		name: 'Buchstabenpuzzle',
		emoji: '🧩',
		route: '/level/puzzle',
		description: 'Ziehe die Buchstaben'
	},
	{
		id: 'lesen',
		name: 'Lesen',
		emoji: '📖',
		route: '/level/lesen',
		description: 'Finde das richtige Bild'
	}
];
