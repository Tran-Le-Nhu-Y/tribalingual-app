import { configureStore } from '@reduxjs/toolkit';
import { genreApi } from '../service/genre';
import { fileApi } from '../service/file';

export const store = configureStore({
	reducer: {
		[genreApi.reducerPath]: genreApi.reducer,
		[fileApi.reducerPath]: fileApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(genreApi.middleware, fileApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
