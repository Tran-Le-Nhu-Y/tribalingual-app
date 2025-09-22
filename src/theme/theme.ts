// theme.ts
export const appTheme = {
	token: {
		colorPrimary: '#3396D3',
		colorBgContainer: '#f9fbff',
		borderRadiusLG: 12,
		fontFamily: 'Arial, sans-serif',
		fontSize: 14,
	},
};

// Nếu cần custom riêng cho component (Menu, Layout...) thì thêm ở đây:
export const appComponents = {
	Menu: {
		itemBorderRadius: 8,
		itemHeight: 42,
		itemColor: '#F6F1F1',
		itemHoverColor: '#333',
		itemSelectedColor: '#333',
		itemHoverBg: '#b5d9f8ff',
		itemSelectedBg: '#F6F1F1',
	},
	Layout: {
		headerBg: '#AFD3E2',
		siderBg: 'linear-gradient(180deg, #146C94,#03506F )',
		footerBg: 'linear-gradient(180deg, #AFD3E2,#03506F )',
	},
};
