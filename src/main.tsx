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
import {
	BookDetailPage,
	BookStoragePage,
	FavoriteBooksPage,
	HomePage,
	ProfilePage,
	StoryManagementPage,
	UploadStoryPage,
} from './pages/index.ts';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<HomePage />} />
			<Route path={RoutePaths.UPLOADSTORY} element={<UploadStoryPage />} />
			<Route path={RoutePaths.HOME} element={<HomePage />} />
			<Route path={RoutePaths.BOOKSTORAGE} element={<BookStoragePage />} />
			<Route path={RoutePaths.FAVORITEBOOK} element={<FavoriteBooksPage />} />
			<Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
			<Route path={RoutePaths.BOOKDETAIL} element={<BookDetailPage />} />

			<Route path={RoutePaths.ADMIN} element={<StoryManagementPage />} />
		</Route>,
	),
);

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<MantineProvider>
			<RouterProvider router={router} />
		</MantineProvider>
	</Provider>,
);
