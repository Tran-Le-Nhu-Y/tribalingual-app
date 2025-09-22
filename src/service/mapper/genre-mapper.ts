function toEntity(response: GenreResponse): Genre {
	const genre: Genre = {
		id: response.id,
		name: response.name,
		description: response.description,
	};
	return genre;
}
export { toEntity };
