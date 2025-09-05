import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n';
import { store } from './redux/store';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router';
import RootLayout from './layout/RootLayout.tsx';
import { RoutePaths } from './util/index.ts';
import { FavoriteBooksPage, HomePage, ProfilePage } from './pages/index.ts';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<HomePage />} />
			<Route path={RoutePaths.HOME} element={<HomePage />} />
			<Route path={RoutePaths.FAVORITEBOOK} element={<FavoriteBooksPage />} />
			<Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
		</Route>,
	),
);

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
