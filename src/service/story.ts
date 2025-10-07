import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../util';
import { tribalingualInstance } from './instance';
import { DeleteError } from '../util/errors';
import type { Story } from '../@types/entities';
import { toEntity } from './mapper/story-mapper';
import type { PagingWrapper, StoryResponse } from '../@types/response';
import type {
	CreateStoryRequest,
	PublishStoryRequest,
	UpdateStoryRequest,
} from '../@types/requests';
import type { GetStoryQuery } from '../@types/queries';

const EXTENSION_URL = 'api/v1/story';
export const storyApi = createApi({
	reducerPath: 'storyApi',
	baseQuery: axiosBaseQuery(tribalingualInstance),
	tagTypes: ['PagingStory', 'Story'],
	endpoints: (builder) => ({
		getStoryById: builder.query<Story, string>({
			query: (genreId: string) => ({
				url: `/${EXTENSION_URL}/${genreId}`,
				method: 'GET',
			}),
			providesTags(result) {
				return result
					? [
							{
								type: 'Story',
								id: result.id,
							} as const,
					  ]
					: [];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(rawResult: StoryResponse) {
				return toEntity(rawResult);
			},
		}),

		getStories: builder.query<PagingWrapper<Story>, GetStoryQuery>({
			query: ({ offset = 0, limit = 100, status }) => ({
				url: `/${EXTENSION_URL}/all`,
				method: 'GET',
				params: {
					offset: offset,
					limit: limit,
					status: status,
				},
				headers: { 'Cache-Control': 'no-cache' },
			}),

			providesTags(result) {
				const pagingTag = {
					type: 'PagingStory',
					id: `${result?.page_number}-${result?.total_pages}-${result?.page_size}-${result?.total_elements}`,
				} as const;

				return result
					? [
							...result.content.map(
								({ id }) => ({ type: 'Story', id } as const),
							),
							pagingTag,
					  ]
					: [pagingTag];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(
				rawResult: PagingWrapper<StoryResponse>,
			): PagingWrapper<Story> {
				const content = rawResult.content;
				if (!content || content.length === 0) {
					return {
						...rawResult,
						content: [],
					};
				}
				// Map each GenreResponse to Genre entity
				const mappedContent: Story[] = content.map(toEntity);

				return {
					...rawResult,
					content: mappedContent,
				};
			},
		}),

		createStory: builder.mutation<string, CreateStoryRequest>({
			query: (data: CreateStoryRequest) => ({
				url: `/${EXTENSION_URL}/create`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags() {
				return [{ type: 'PagingStory' } as const];
			},
			transformResponse: (response: string) => response,
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
		}),
		updateStory: builder.mutation<void, UpdateStoryRequest>({
			query: (data: UpdateStoryRequest) => ({
				url: `/${EXTENSION_URL}/${data.id}/update`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags(_result, _error, arg) {
				const { id } = arg;
				return [{ type: 'Story', id: id } as const];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
		}),

		publishStory: builder.mutation<void, PublishStoryRequest>({
			query: (data: PublishStoryRequest) => ({
				url: `/${EXTENSION_URL}/${data.storyId}/publish`,
				method: 'PUT',
				params: { adminId: data.adminId },
			}),
			invalidatesTags(_result, _error, arg) {
				return [{ type: 'Story', id: arg.storyId }];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
		}),

		deleteStory: builder.mutation<{ message: string }, string>({
			query: (storyId: string) => ({
				url: `/${EXTENSION_URL}/${storyId}/delete`,
				method: 'DELETE',
			}),
			invalidatesTags(_result, _error, arg) {
				const storyId = arg;
				return [
					{ type: 'Story', id: storyId } as const,
					{ type: 'PagingStory' } as const,
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
	useGetStoriesQuery,
	useGetStoryByIdQuery,
	useCreateStoryMutation,
	useUpdateStoryMutation,
	useDeleteStoryMutation,
	usePublishStoryMutation,
} = storyApi;
