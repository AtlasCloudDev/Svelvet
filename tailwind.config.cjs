module.exports = {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			nunito: ['Nunito', 'sans-serif']
		},
		extend: {
			screens: {
				contributors: { raw: '(min-width: 935px)' }
			}
		}
	},
	plugins: []
};
