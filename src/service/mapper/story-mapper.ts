import type { Story } from '../../@types/entities';
import type { StoryResponse } from '../../@types/response';

function toEntity(response: StoryResponse): Story {
	const story: Story = {
		id: response.id,
		authorId: response.authorId,
		adminId: response.adminId,
		genreId: response.genreId,
		fileId: response.fileId,
		title: response.title,
		description: response.description,
		language: response.language,
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
	};
	return story;
}
export { toEntity };
