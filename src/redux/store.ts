import { configureStore } from '@reduxjs/toolkit';
import { genreApi } from '../service/genre';
import { fileApi } from '../service/file';
import { storyApi } from '../service/story';

export const store = configureStore({
	reducer: {
		[genreApi.reducerPath]: genreApi.reducer,
		[fileApi.reducerPath]: fileApi.reducer,
		[storyApi.reducerPath]: storyApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			genreApi.middleware,
			fileApi.middleware,
			storyApi.middleware,
		),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
