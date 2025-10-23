import type { StoryStatus } from '../util';

declare interface GetQuery {
	offset?: number?;
	limit?: number?;
}
declare interface GetStoryQuery {
	offset?: number?;
	limit?: number?;
	status?: StoryStatus?;
	authorId?: string?;
	title?: string?;
}

declare interface GetCommentQuery {
	offset?: number?;
	limit?: number?;
	storyId?: string?;
}
