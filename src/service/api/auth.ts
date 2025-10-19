import { tribalingualInstance } from '../instance';
import type { Auth0UserResponse } from '../../@types/response';

export const getAuth0User = async (
	userId: string,
): Promise<Auth0UserResponse> => {
	try {
		const res = await tribalingualInstance.get(`/auth0-user/${userId}`);
		return res.data;
	} catch (err) {
		console.error('Failed to fetch Auth0 user:', err);
		throw err;
	}
};
