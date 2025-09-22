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
