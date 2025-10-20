import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../util';
import { tribalingualInstance } from './instance';
import { DeleteError } from '../util/errors';
import type { Comment, Story } from '../@types/entities';
import { toStoryEntity } from './mapper/story-mapper';
import type {
	CommentResponse,
	PagingWrapper,
	StoryResponse,
} from '../@types/response';
import type {
	CreateCommentRequest,
	CreateFavoriteRequest,
	CreateStoryRequest,
	DeleteFavoriteRequest,
	DeleteStoryRequest,
	PublishStoryRequest,
	UpdateStoryRequest,
} from '../@types/requests';
import type { GetCommentQuery, GetStoryQuery } from '../@types/queries';
import { toCommentEntity } from './mapper/comment-mapper';

const EXTENSION_URL = 'api/v1/story';
export const storyApi = createApi({
	reducerPath: 'storyApi',
	baseQuery: axiosBaseQuery(tribalingualInstance),
	tagTypes: ['PagingStory', 'Story', 'PagingComment', 'Comment'],
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
				return toStoryEntity(rawResult);
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
				// Map each StoryResponse to Story entity
				const mappedContent: Story[] = content.map(toStoryEntity);

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

		deleteStory: builder.mutation<{ message: string }, DeleteStoryRequest>({
			query: (data: DeleteStoryRequest) => ({
				url: `/${EXTENSION_URL}/${data.storyId}/delete`,
				method: 'DELETE',
				params: { userId: data.userId },
			}),
			invalidatesTags(_result, _error, arg) {
				return [
					{ type: 'Story', id: arg.storyId } as const,
					{ type: 'PagingStory' } as const,
				];
			},
			transformErrorResponse(baseQueryReturnValue) {
				const status = baseQueryReturnValue.status;
				const { message } = baseQueryReturnValue.data as { message: string };
				if (
					status === 404 &&
					message.includes('Story with id') &&
					message.includes('not found')
				)
					return DeleteError.NOT_FOUND;
				return DeleteError.UNKNOWN_ERROR;
			},
		}),

		// comment
		getAllComments: builder.query<PagingWrapper<Comment>, GetCommentQuery>({
			query: ({ offset = 0, limit = 100, storyId }) => ({
				url: `/${EXTENSION_URL}/${storyId}/comments/all`,
				method: 'GET',
				params: {
					offset: offset,
					limit: limit,
				},
				headers: { 'Cache-Control': 'no-cache' },
			}),

			providesTags(result) {
				const pagingTag = {
					type: 'PagingComment',
					id: `${result?.page_number}-${result?.total_pages}-${result?.page_size}-${result?.total_elements}`,
				} as const;

				return result
					? [
							...result.content.map(
								({ id }) => ({ type: 'Comment', id } as const),
							),
							pagingTag,
					  ]
					: [pagingTag];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(
				rawResult: PagingWrapper<CommentResponse>,
			): PagingWrapper<Comment> {
				const content = rawResult.content;
				if (!content || content.length === 0) {
					return {
						...rawResult,
						content: [],
					};
				}
				// Map each CommentResponse to Comment entity
				const mappedContent: Comment[] = content.map(toCommentEntity);

				return {
					...rawResult,
					content: mappedContent,
				};
			},
		}),
		createComment: builder.mutation<string, CreateCommentRequest>({
			query: (data: CreateCommentRequest) => ({
				url: `/${EXTENSION_URL}/${data.storyId}/comment/create`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags() {
				return [{ type: 'PagingComment' } as const];
			},
			transformResponse: (response: string) => response,
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
		}),

		// favorite
		createFavorite: builder.mutation<string, CreateFavoriteRequest>({
			query: (data: CreateFavoriteRequest) => ({
				url: `/${EXTENSION_URL}/${data.storyId}/favorite/add`,
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

		deleteFavorite: builder.mutation<
			{ message: string },
			DeleteFavoriteRequest
		>({
			query: (data: DeleteFavoriteRequest) => ({
				url: `/${EXTENSION_URL}/${data.storyId}/favorite/delete/${data.userId}`,
				method: 'DELETE',
			}),
			invalidatesTags(_result, _error, arg) {
				return [
					{ type: 'Story', id: arg.storyId } as const,
					{ type: 'PagingStory' } as const,
				];
			},
			transformErrorResponse(baseQueryReturnValue) {
				const status = baseQueryReturnValue.status;
				const { message } = baseQueryReturnValue.data as { message: string };
				if (
					status === 404 &&
					message.includes('Favorite with story id') &&
					message.includes('not found')
				)
					return DeleteError.NOT_FOUND;
				return DeleteError.UNKNOWN_ERROR;
			},
		}),
		isFavorited: builder.query<boolean, { storyId: string; userId: string }>({
			query: ({ storyId, userId }) => ({
				url: `/${EXTENSION_URL}/${storyId}/favorite/is-favorited/${userId}`,
			}),
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(rawResult: { isFavorited: boolean }) {
				return rawResult.isFavorited;
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
	useGetAllCommentsQuery,
	useCreateCommentMutation,
	useCreateFavoriteMutation,
	useDeleteFavoriteMutation,
	useIsFavoritedQuery,
} = storyApi;
