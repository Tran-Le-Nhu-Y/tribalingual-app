// theme.ts
export const appTheme = {
	token: {
		colorPrimary: '#6CB38F',
		colorPrimaryHover: '#549F7A',

		colorSecondary: '#1677ff',
		colorSecondaryHover: '#0b2e5fff',
		colorSecondaryActive: '#1677ff',

		colorLink: '#6CB38F',
		colorInfo: '#6CB38F',
		colorSuccess: '#6CB38F',
		colorWarning: '#F6C453',

		colorTextHeading: '#0a410aff',

		borderRadiusLG: 12,
		fontFamily: 'Arial, sans-serif',
		fontSize: 14,
	},
};

// --- Component overrides  ---
export const appComponents = {
	Menu: {
		itemBorderRadius: 8,
		itemHeight: 42,

		// text menu
		itemColor: '#000000ff',
		itemHoverColor: '#0a410aff',
		itemSelectedColor: '#0a410aff',

		itemHoverBg: '#ffffffff',
		itemSelectedBg: '#ffffffff',
	},

	Layout: {
		headerBg: 'rgba(119, 238, 169, 0.35)',

		siderBg:
			'linear-gradient(180deg, rgba(119, 238, 169, 0.35), rgba(16, 189, 88, 0.9))',

		footerBg:
			'linear-gradient(180deg,rgba(67, 209, 126, 0.65), rgba(16, 189, 88, 0.9))',
	},

	Typography: {
		titleMarginBottom: 4,
		colorTextHeading: '#0a410aff',
		fontWeightStrong: 700,
	},
};
