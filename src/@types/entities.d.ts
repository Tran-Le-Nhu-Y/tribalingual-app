import { StoryStatus, Language } from './../util/index';
declare interface Genre {
	id: string;
	name: string;
	description?: string | null;
}

declare interface User {
	id: string;
	username: string;
	email: string;
	avatarUrl: string;
}
declare interface File {
	id: string;
	storyId: string;
	name: string;
	mime_type: string;
	size: number;
	url: string;
	save_path: string;
}

declare interface Story {
	id: string;
	authorId: string;
	adminId?: string | null;
	genreId: string;
	fileId?: string | null;

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

	file?: File | null;
	genre?: Genre | null;
	comments?: Comment[] | null;
}

declare interface Comment {
	id: string;
	content: string;
	createdAt: Date;
	userId: string;
	storyId: string;
}

declare interface Favorite {
	storyId: string;
	userId: string;
	addedDate: Date;
}

declare interface View {
	storyId: string;
	userId: string;
	lastViewDate: Date;
}
