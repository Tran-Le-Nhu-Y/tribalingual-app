import type { User } from '@auth0/auth0-react';
import { tribalingualInstance } from '../instance';

export const syncUser = async (user: User) => {
	return tribalingualInstance.post('/auth/sync', {
		id: user.sub,
		name: user.name || user.nickname || user.email?.split('@')[0] || 'Unknown',
		email: user.email || null,
		picture: user.picture || null,
	});
};
