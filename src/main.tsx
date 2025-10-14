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
	ApproveStoryPage,
	BookDetailPage,
	BookStoragePage,
	FavoriteBooksPage,
	GenreManagementPage,
	HomePage,
	ProfilePage,
	StoryUploadedDetailPage,
	StoryManagementPage,
	UploadStoryPage,
} from './pages/index.ts';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { App as AntdApp } from 'antd';
import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<HomePage />} />
			<Route path={RoutePaths.UPLOAD_STORY} element={<UploadStoryPage />} />
			<Route path={RoutePaths.HOME} element={<HomePage />} />
			<Route path={RoutePaths.STORY} element={<BookStoragePage />} />
			<Route path={RoutePaths.FAVORITEBOOK} element={<FavoriteBooksPage />} />
			<Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
			<Route path={RoutePaths.STORY_DETAIL} element={<BookDetailPage />} />

			<Route path={RoutePaths.ADMIN} element={<StoryManagementPage />} />
			<Route
				path={RoutePaths.APPROVE_STORY_UPLOADED}
				element={<ApproveStoryPage />}
			/>
			<Route
				path={RoutePaths.STORY_UPLOADED_DETAIL}
				element={<StoryUploadedDetailPage />}
			/>
			<Route path={RoutePaths.GENRE} element={<GenreManagementPage />} />
		</Route>,
	),
);

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
	<Auth0Provider
		domain={domain}
		clientId={clientId}
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}
	>
		<Provider store={store}>
			<MantineProvider>
				<AntdApp>
					<RouterProvider router={router} />
				</AntdApp>
			</MantineProvider>
		</Provider>
	</Auth0Provider>,
);
