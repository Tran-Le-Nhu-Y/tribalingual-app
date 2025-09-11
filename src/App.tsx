import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/Reader/HomePage';
import { appTheme, appComponents } from './theme/theme';
import { RootLayout } from './layout';
import { ConfigProvider } from 'antd';
function App() {
	return (
		<ConfigProvider
			theme={{
				token: appTheme.token,
				components: appComponents,
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<RootLayout />}>
						<Route index element={<HomePage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
}

export default App;
