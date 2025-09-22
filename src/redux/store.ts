import { configureStore } from '@reduxjs/toolkit';
import { genreApi } from '../service/genre';

export const store = configureStore({
	reducer: {
		[genreApi.reducerPath]: genreApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(genreApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
