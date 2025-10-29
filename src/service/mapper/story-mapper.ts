import type { Story } from '../../@types/entities';
import type { StoryResponse } from '../../@types/response';

function toStoryEntity(response: StoryResponse): Story {
	const story: Story = {
		id: response.id,
		authorId: response.authorId,
		adminId: response.adminId,
		genreId: response.genreId,
		fileId: response.fileId,
		title: response.title,
		description: response.description,
		language: response.language,
		viewLink: response.viewLink,
		gameLink: response.gameLink,
		audioLink: response.audioLink,
		hmongContent: response.hmongContent,
		vietnameseContent: response.vietnameseContent,
		englishContent: response.englishContent,
		status: response.status,
		viewCount: response.viewCount,
		favoriteCount: response.favoriteCount,
		commentCount: response.commentCount,
		lastUpdatedDate: response.lastUpdatedDate,
		publishedDate: response.publishedDate,
		uploadedDate: response.uploadedDate,

		file: response.file
			? {
					id: response.file.id,
					storyId: response.file.storyId,
					name: response.file.name,
					mime_type: response.file.mime_type,
					size: response.file.size,
					url: response.file.url,
					save_path: response.file.save_path,
			  }
			: null,

		genre: response.genre
			? {
					id: response.genre.id,
					name: response.genre.name,
					description: response.genre.description,
			  }
			: null,

		comments: response.comments ?? [],
	};

	return story;
}

export { toStoryEntity };
