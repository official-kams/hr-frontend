const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@interfaces': path.resolve(__dirname, 'src/interfaces'),
		},
	},
};