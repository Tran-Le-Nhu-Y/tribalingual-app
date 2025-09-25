import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../util';
import { tribalingualInstance } from './instance';
import { toEntity } from './mapper/genre-mapper';
import { DeleteError } from '../util/errors';
import type { GenreResponse, PagingWrapper } from '../@types/response';
import type { Genre } from '../@types/entities';
import type {
	CreateGenreRequest,
	UpdateGenreRequest,
} from '../@types/requests';

const EXTENSION_URL = 'api/v1/genre';
export const genreApi = createApi({
	reducerPath: 'genreApi',
	baseQuery: axiosBaseQuery(tribalingualInstance),
	tagTypes: ['PagingGenre', 'Genre'],
	endpoints: (builder) => ({
		getGenreById: builder.query<Genre, string>({
			query: (genreId: string) => ({
				url: `/${EXTENSION_URL}/${genreId}`,
				method: 'GET',
			}),
			providesTags(result) {
				return result
					? [
							{
								type: 'Genre',
								id: result.id,
							} as const,
					  ]
					: [];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(rawResult: GenreResponse) {
				return toEntity(rawResult);
			},
		}),

		getGenres: builder.query<PagingWrapper<Genre>, GetQuery>({
			query: ({ offset = 0, limit = 100 }) => ({
				url: `/${EXTENSION_URL}/all`,
				method: 'GET',
				params: {
					offset: offset,
					limit: limit,
				},
				headers: { 'Cache-Control': 'no-cache' },
			}),

			providesTags(result) {
				const pagingTag = {
					type: 'PagingGenre',
					id: `${result?.page_number}-${result?.total_pages}-${result?.page_size}-${result?.total_elements}`,
				} as const;

				return result
					? [
							...result.content.map(
								({ id }) => ({ type: 'Genre', id } as const),
							),
							pagingTag,
					  ]
					: [pagingTag];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(
				rawResult: PagingWrapper<GenreResponse>,
			): PagingWrapper<Genre> {
				const content = rawResult.content;
				if (!content || content.length === 0) {
					return {
						...rawResult,
						content: [],
					};
				}
				// Map each GenreResponse to Genre entity
				const mappedContent: Genre[] = content.map(toEntity);

				return {
					...rawResult,
					content: mappedContent,
				};
			},
		}),

		createGenre: builder.mutation<string, CreateGenreRequest>({
			query: (data: CreateGenreRequest) => ({
				url: `/${EXTENSION_URL}/create`,
				method: 'POST',
				body: {
					name: data.name,
					description: data.description,
				},
			}),
			invalidatesTags() {
				return [{ type: 'PagingGenre' } as const];
			},
			transformResponse: (response: string) => response,
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
		}),
		updateGenre: builder.mutation<void, UpdateGenreRequest>({
			query: (data: UpdateGenreRequest) => ({
				url: `/${EXTENSION_URL}/${data.id}/update`,
				method: 'PUT',
				body: {
					name: data.name,
					description: data.description,
				},
			}),
			invalidatesTags(_result, _error, arg) {
				const { id } = arg;
				return [{ type: 'Genre', id: id } as const];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
		}),

		deleteGenre: builder.mutation<{ message: string }, string>({
			query: (genreId: string) => ({
				url: `/${EXTENSION_URL}/${genreId}/delete`,
				method: 'DELETE',
			}),
			invalidatesTags(_result, _error, arg) {
				const genreId = arg;
				return [
					{ type: 'Genre', id: genreId } as const,
					{ type: 'PagingGenre' } as const,
				];
			},
			transformErrorResponse(baseQueryReturnValue) {
				const status = baseQueryReturnValue.status;
				const { message } = baseQueryReturnValue.data as { message: string };
				if (
					status === 404 &&
					message.includes('Genre with id') &&
					message.includes('not found')
				)
					return DeleteError.NOT_FOUND;
				return DeleteError.UNKNOWN_ERROR;
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetGenresQuery,
	useGetGenreByIdQuery,
	useCreateGenreMutation,
	useDeleteGenreMutation,
	useUpdateGenreMutation,
} = genreApi;
