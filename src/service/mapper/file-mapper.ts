import type { File } from '../../@types/entities';

function toEntity(response: FileResponse): File {
	const file: File = {
		id: response.id,
		storyId: response.storyId,
		name: response.name,
		mime_type: response.mime_type,
		size: response.size,
		url: response.url,
		save_path: response.save_path,
	};
	return file;
}
export { toEntity };
