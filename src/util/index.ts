import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	CreateAxiosDefaults,
} from 'axios';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';

export const PathHolders = {
	STORY_ID: 'storyId',
};

const HOME = '/home';
const BOOKSTORAGE = '/book-storage';
const FAVORITEBOOK = '/favorite-books';
const PROFILE = '/profile';
const UPLOADSTORY = '/upload-story';
const BOOKDETAIL = '/book-detail';
const ADMIN = '/admin';
const GENRE = '/genre';
export const RoutePaths = {
	ADMIN,
	APPROVE_STORY: `${ADMIN}/story/:${PathHolders.STORY_ID}/approve`,

	GENRE,

	HOME,
	BOOKSTORAGE,
	BOOKDETAIL,
	FAVORITEBOOK,

	UPLOADSTORY,

	PROFILE,
};

export const HideDuration = {
	FAST: 3000,
	NORMAL: 5000,
	SLOW: 7000,
};

export const StoryStatus = {
	PENDING: 'PENDING',
	PUBLISHED: 'PUBLISHED',
	REJECTED: 'REJECTED',
	HIDDEN: 'HIDDEN',
	UPDATED: 'UPDATED',
};

export const Language = {
	HMONG: 'HMONG',
	ENGLISH: 'ENGLISH',
	VIETNAMESE: 'VIETNAMESE',
};

export const axiosQueryHandler = async <T>(func: () => Promise<T>) => {
	try {
		const result = await func();
		return { data: result };
	} catch (axiosError) {
		const err = axiosError as AxiosError;
		return {
			error: {
				status: err.response!.status!,
				data: err.response?.data || err.message,
			},
		};
	}
};

export const axiosBaseQuery =
	(
		instance: AxiosInstance,
	): BaseQueryFn<
		{
			url: string;
			method?: AxiosRequestConfig['method'];
			body?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
			headers?: AxiosRequestConfig['headers'];
		},
		unknown,
		FetchBaseQueryError
	> =>
	async ({ url, method, body, params, headers }) => {
		try {
			const result = await instance({
				url,
				method,
				data: body,
				params,
				headers,
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response!.status!,
					data: err.response?.data || err.message,
				},
			};
		}
	};

export function createAxiosInstance(config?: CreateAxiosDefaults) {
	const instance = axios.create(config);

	instance.interceptors.request.use(
		async function (config) {
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);

	return instance;
}

export function getFileSize(bytes: number) {
	if (bytes < 1e3) return `${bytes} bytes`;
	else if (bytes >= 1e3 && bytes < 1e6) return `${(bytes / 1e3).toFixed(1)} KB`;
	else return `${(bytes / 1e6).toFixed(1)} MB`;
}

export const convertToAPIDateFormat = (date: Dayjs) => {
	return date.format('YYYY-MM-DD');
};

export const parseToDayjs = (date: string) => {
	return dayjs(date, 'YYYY-MM-DD');
};

export const TextLength = {
	SHORT: 6,
	MEDIUM: 100,
	LONG: 150,
	VERY_LONG: 255,
	EXTREME_LONG: 60000,
};
export type TextLengthValue = (typeof TextLength)[keyof typeof TextLength];
export const isValidLength = (text: string, length: TextLengthValue) =>
	text.length <= length;
