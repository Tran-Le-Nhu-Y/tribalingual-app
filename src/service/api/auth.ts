import type { User } from '@auth0/auth0-react';
import { tribalingualInstance } from '../instance';
import type { Auth0UserResponse } from '../../@types/response';

export const syncUser = async (user: User) => {
	return tribalingualInstance.post('/auth/sync', {
		id: user.sub,
		name: user.name || user.nickname || user.email?.split('@')[0] || 'Unknown',
		email: user.email || null,
		picture: user.picture || null,
	});
};

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
