import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../util';
import { tribalingualInstance } from './instance';
import { DeleteError } from '../util/errors';
import { toEntity } from './mapper/file-mapper';
import type { FileResponse, PagingWrapper } from '../@types/response';
import type { File } from '../@types/entities';
import type { UploadFileRequest } from '../@types/requests';
import type { GetQuery } from '../@types/queries';

const EXTENSION_URL = 'api/v1/file';
export const fileApi = createApi({
	reducerPath: 'fileApi',
	baseQuery: axiosBaseQuery(tribalingualInstance),
	tagTypes: ['PagingFile', 'File'],
	endpoints: (builder) => ({
		getFileById: builder.query<File, string>({
			query: (fileId: string) => ({
				url: `/${EXTENSION_URL}/${fileId}`,
				method: 'GET',
			}),
			providesTags(result) {
				return result
					? [
							{
								type: 'File',
								id: result.id,
							} as const,
					  ]
					: [];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(rawResult: FileResponse) {
				return toEntity(rawResult);
			},
		}),

		getFiles: builder.query<PagingWrapper<File>, GetQuery>({
			query: ({ offset = 0, limit = 100 }) => ({
				url: `/${EXTENSION_URL}/all`,
				method: 'GET',
				params: {
					offset: offset,
					limit: limit,
				},
				headers: { 'Cache-Control': 'no-cache' },
			}),

			providesTags(result) {
				const pagingTag = {
					type: 'PagingFile',
					id: `${result?.page_number}-${result?.total_pages}-${result?.page_size}-${result?.total_elements}`,
				} as const;

				return result
					? [
							...result.content.map(
								({ id }) => ({ type: 'File', id } as const),
							),
							pagingTag,
					  ]
					: [pagingTag];
			},
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
			transformResponse(
				rawResult: PagingWrapper<FileResponse>,
			): PagingWrapper<File> {
				const content = rawResult.content;
				if (!content || content.length === 0) {
					return {
						...rawResult,
						content: [],
					};
				}
				// Map each FileResponse to File entity
				const mappedContent: File[] = content.map(toEntity);

				return {
					...rawResult,
					content: mappedContent,
				};
			},
		}),

		uploadFile: builder.mutation<FileResponse, UploadFileRequest>({
			query: ({ file }) => {
				const formData = new FormData();
				formData.append('file', file);

				return {
					url: `/${EXTENSION_URL}/upload`,
					method: 'POST',
					body: formData,
				};
			},
			invalidatesTags() {
				return [{ type: 'File' } as const];
			},
			transformResponse: (response: FileResponse) => response,
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue.status;
			},
		}),

		deleteFile: builder.mutation<{ message: string }, string>({
			query: (fileId: string) => ({
				url: `/${EXTENSION_URL}/${fileId}/delete`,
				method: 'DELETE',
			}),
			invalidatesTags(_result, _error, arg) {
				const fileId = arg;
				return [
					{ type: 'File', id: fileId } as const,
					{ type: 'PagingFile' } as const,
				];
			},
			transformErrorResponse(baseQueryReturnValue) {
				const status = baseQueryReturnValue.status;
				const { message } = baseQueryReturnValue.data as { message: string };
				if (
					status === 404 &&
					message.includes('File with id') &&
					message.includes('not found')
				)
					return DeleteError.NOT_FOUND;
				return DeleteError.UNKNOWN_ERROR;
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetFileByIdQuery,
	useDeleteFileMutation,
	useUploadFileMutation,
	useGetFilesQuery,
} = fileApi;
