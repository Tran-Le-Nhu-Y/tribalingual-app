declare interface Genre {
	id: string;
	name: string;
	description?: string | null;
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
