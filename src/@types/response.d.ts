import { Language, StoryStatus } from './../util/index';
declare interface PagingWrapper<T> {
	content: T[];
	page_number: number;
	page_size: number;
	total_elements: number;
	total_pages: number;
}

declare interface GenreResponse {
	id: string;
	name: string;
	description?: string | null;
}

declare interface FileResponse {
	id: string;
	storyId: string;
	name: string;
	mime_type: string;
	size: number;
	url: string;
	save_path: string;
}

declare interface StoryResponse {
	id: string;
	authorId: string;
	adminId?: string;
	genreId: string;
	fileId?: string;
	title: string;
	description?: string;
	language: Language;
	hmongContent?: string | null;
	englishContent?: string | null;
	vietnameseContent?: string | null;
	status: StoryStatus;
	uploadedDate?: Date | null;
	publishedDate?: Date | null;
	lastUpdatedDate?: Date | null;
	viewCount: number;
	commentCount: number;
	favoriteCount: number;

	file?: FileResponse | null;
	genre?: GenreResponse | null;
	comments?: CommentResponse[] | null;
}

declare interface CommentResponse {
	id: string;
	content: string;
	createdAt: Date;
	userId: string;
	storyId: string;
}

declare interface Auth0UserResponse {
	user_id: string;
	name: string;
	email: string;
	picture: string;
}
