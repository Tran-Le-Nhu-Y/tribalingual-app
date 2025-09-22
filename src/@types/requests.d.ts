declare interface CreateGenreRequest {
	name: string;
	description?: string | null;
}

declare interface UpdateGenreRequest {
	id: string;
	name: string;
	description?: string | null;
}
