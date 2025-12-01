import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				'bounce-in': 'bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
				'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
				'pop': 'pop 0.3s ease-out forwards',
			},
			keyframes: {
				'bounce-in': {
					'0%': { opacity: '0', transform: 'translateY(-100px)' },
					'60%': { opacity: '1', transform: 'translateY(25px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'shake': {
					'10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
					'20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
					'30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
					'40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
				},
				'pop': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			fontFamily: {
				comic: ['"Comic Sans MS"', '"Chalkboard SE"', 'sans-serif'],
			}
		}
	},
	plugins: []
} satisfies Config;
