import {
	useGetFileByIdQuery as useGetFileById,
	useDeleteFileMutation as useDeleteFile,
	useUploadFileMutation as useUploadFile,
	useGetFilesQuery as useGetFiles,
} from './file';
export { useGetFileById, useDeleteFile, useUploadFile, useGetFiles };
import {
	useGetGenresQuery as useGetGenres,
	useGetGenreByIdQuery as useGetGenreById,
	useCreateGenreMutation as useCreateGenre,
	useDeleteGenreMutation as useDeleteGenre,
	useUpdateGenreMutation as useUpdateGenre,
} from './genre';

export {
	useGetGenres,
	useGetGenreById,
	useCreateGenre,
	useDeleteGenre,
	useUpdateGenre,
};
import {
	useGetStoriesQuery as useGetStories,
	useGetStoryByIdQuery as useGetStoryById,
	useCreateStoryMutation as useCreateStory,
	useUpdateStoryMutation as useUpdateStory,
	useDeleteStoryMutation as useDeleteStory,
	usePublishStoryMutation as usePublishStory,
	useGetAllCommentsQuery as useGetAllComments,
	useCreateCommentMutation as useCreateComment,
	useCreateFavoriteMutation as useCreateFavorite,
	useDeleteFavoriteMutation as useDeleteFavorite,
	useIsFavoritedQuery as useIsFavorited,
	useGetAllFavoritedStoriesByUserQuery as useGetAllFavoritedStoriesByUser,
	useLazySearchStoriesByTitleQuery as useLazySearchStoriesByTitle,
	useCreateViewMutation as useCreateView,
} from './story';

export {
	useGetStories,
	useGetStoryById,
	useCreateStory,
	useUpdateStory,
	useDeleteStory,
	usePublishStory,
	useGetAllComments,
	useCreateComment,
	useCreateFavorite,
	useDeleteFavorite,
	useIsFavorited,
	useGetAllFavoritedStoriesByUser,
	useLazySearchStoriesByTitle,
	useCreateView,
};
