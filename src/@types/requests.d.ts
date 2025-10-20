import { Language, StoryStatus } from './../util/index';
declare interface CreateGenreRequest {
	name: string;
	description?: string | null;
}

declare interface UpdateGenreRequest {
	id: string;
	name: string;
	description?: string | null;
}

declare interface UploadFileRequest {
	file: File;
}

declare interface CreateStoryRequest {
	authorId: string;
	genreId: string;
	fileId?: string | null;
	title: string;
	description?: string;
	language: Language;
	hmongContent?: string | null;
	englishContent?: string | null;
	vietnameseContent?: string | null;
	status: StoryStatus;
}

declare interface UpdateStoryRequest {
	id: string;
	userId?: string;
	genreId: string;
	fileId?: string;
	title: string;
	description?: string;
	language: Language;
	hmongContent?: string | null;
	englishContent?: string | null;
	vietnameseContent?: string | null;
	status: StoryStatus;
}

declare interface PublishStoryRequest {
	storyId: string;
	adminId: string;
}

declare interface DeleteStoryRequest {
	storyId: string;
	userId: string;
}

declare interface CreateCommentRequest {
	storyId: string;
	userId: string;
	content: string;
	createdAt?: Date;
}

declare interface CreateFavoriteRequest {
	storyId: string;
	userId: string;
}

declare interface DeleteFavoriteRequest {
	storyId: string;
	userId: string;
}

declare interface CreateViewRequest {
	storyId: string;
	userId: string;
	lastViewDate?: Date;
}
