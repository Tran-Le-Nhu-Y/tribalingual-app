import type { StoryStatus } from '../util';

declare interface GetQuery {
	offset?: number?;
	limit?: number?;
}
declare interface GetStoryQuery {
	offset?: number?;
	limit?: number?;
	status?: StoryStatus?;
}

declare interface GetCommentQuery {
	offset?: number?;
	limit?: number?;
	storyId?: string?;
}
