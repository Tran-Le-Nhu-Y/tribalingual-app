import { useState, useEffect } from 'react';
import { getAuth0User } from '../service/api/auth';
import type { Auth0UserResponse } from '../@types/response';

export const useAuth0User = (userId: string) => {
	const [user, setUser] = useState<Auth0UserResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!userId) return;
		setLoading(true);

		getAuth0User(userId)
			.then(setUser)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [userId]);

	return { user, loading, error };
};
