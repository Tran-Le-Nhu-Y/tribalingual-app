import type { Genre } from '../../@types/entities';
import type { GenreResponse } from '../../@types/response';

function toEntity(response: GenreResponse): Genre {
	const genre: Genre = {
		id: response.id,
		name: response.name,
		description: response.description,
	};
	return genre;
}
export { toEntity };
