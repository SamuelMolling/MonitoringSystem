const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false,
	theme: {
			screens: {
				xs: '641px',
				sm: '769px',
				md: '1024px',
				lg: '1281px',
				xl: '1536px',
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				background: 'var(--color-background)',
				white: 'var(--color-white)',
				green: 'var(--color-green)',
				blue: 'var(--color-blue)',
				black: 'var(--color-black)',
				dark: 'var(--color-dark)',
				bright: 'var(--color-bright)',
				red: 'var(--color-red)',
				'background-blue': 'var(--color-background-blue)',
				'background-get': 'var(--color-background-get)',
				'background-post': 'var(--color-background-post)',
				'background-put': 'var(--color-background-put)',
				greyish: 'var(--color-greyish)',
				grey: 'var(--color-grey)',
				'background-pop-up': 'var(--color-background-pop-up)',
				'dark-blue': 'var(--color-dark-blue)',
				'icon-check': 'var(--color-icon-check)',
				'icon-error': 'var(--color-icon-error)',
				'light-gray': 'var(--color-light-gray)',
				'grey-table': 'var(--color-grey-table)',
				'dark-grey-table': 'var(--color-dark-grey-table)',
			},
			fontSize: {
				xss: 'var(--font-size-xss)',
				xs: 'var(--font-size-xs)',
				x13: 'var(--font-size-x13)',
				sm: 'var(--font-size-sm)',
				base: 'var(--font-size-base)',
				lg: 'var(--font-size-lg)',
				xl: 'var(--font-size-xl)',
				x24: 'var(--font-size-x24)',
				x26: 'var(--font-size-x26)',
				x30: 'var(--font-size-x30)',
				x36: 'var(--font-size-x36)',
				x42: 'var(--font-size-x42)',
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
			},
			extend: {
				width: {
					x66: 'var(--width-x66)',
					x72: 'var(--width-x72)',
					x77: 'var(--width-x77)',
					x85: 'var(--width-x85)',
					x171: 'var(--width-x171)',
					x271: 'var(--width-x271)',
					x284: 'var(--width-x284)',
					x438: 'var(--width-x438)',
					x812: 'var(--width-x812)',
				},
				height: {
					x26: 'var(--height-x26)',
					x75: 'var(--height-x75)',
					x77: 'var(--height-x77)',
					x85: 'var(--height-x85)',
					x90: 'var(--height-x90)',
					x100: 'var(--height-x100)',
					x139: 'var(--height-x139)',
					x149: 'var(--height-x149)',
					x186: 'var(--height-x186)',
					x200: 'var(--height-x200)',
					x250: 'var(--height-x250)',
					x340: 'var(--height-x340)',
					x350: 'var(--height-x350)',
				},
				maxWidth: {
					x26: 'var(--max-width-x26)',
					x40: 'var(--max-width-x40)',
					x411: 'var(--max-width-x411)',
					x573: 'var(--max-width-x573)',
					x530: 'var(--max-width-x530)',
					x684: 'var(--max-width-x684)',
					x1320: 'var(--max-width-x1320)',
				},
				minWidth: {
					x18: 'var(--min-width-x18)',
					x271: 'var(--min-width-x271)',
					x284: 'var(--min-width-x284)',
				},
				minHeight: {
					x18: 'var(--min-height-x18)',
					x32: 'var(--min-height-x32)',
					x65: 'var(--min-height-x65)',
					x105: 'var(--min-height-x105)',
					x85: 'var(--min-height-x85)',
					x105: 'var(--min-height-x105)',
				},
				spacing: {
					'x-80vw': 'var(--right-x-80vw)'
				},
			}
	},
	variants: {
		extend: {},
		width: ['responsive', 'important'],
		display: ['responsive', 'important'],
		color: ['responsive', 'important'],
		fontSize: ['responsive', 'important'],
	},
	plugins: [
    plugin(function({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls(decl => {
            decl.important = true
          })
        })
      })
    }),
	],
}