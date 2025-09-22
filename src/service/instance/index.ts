import { createAxiosInstance } from '../../util';

export const tribalingualInstance = createAxiosInstance({
	baseURL: `${import.meta.env.VITE_API_GATEWAY}`,
});
