import type { Comment } from '../../@types/entities';
import type { CommentResponse } from '../../@types/response';

function toCommentEntity(response: CommentResponse): Comment {
	const comment: Comment = {
		id: response.id,
		content: response.content,
		createdAt: response.createdAt,
		userId: response.userId,
		storyId: response.storyId,
	};
	return comment;
}
export { toCommentEntity };
