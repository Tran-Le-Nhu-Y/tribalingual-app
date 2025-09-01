import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import { RootLayout } from './layout';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
