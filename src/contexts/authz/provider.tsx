import { useAuth0 } from '@auth0/auth0-react';
import {
	AuthzContext,
	PermissionEnum,
	tokenHolder,
	type AuthzData,
	type PermissionKey,
} from '.';
import { useEffect, useState, type PropsWithChildren } from 'react';
import * as jwt from 'jsonwebtoken';

const AuthzProvider = ({ children }: PropsWithChildren) => {
	const {
		user,
		isAuthenticated,
		isLoading,
		loginWithRedirect,
		logout,
		getAccessTokenSilently,
	} = useAuth0();
	const [state, setState] = useState<AuthzData>({
		isLoading: isLoading,
		isAuthenticated: isAuthenticated,
		loginWithRedirect: loginWithRedirect,
		logout: logout,
	});
	useEffect(() => {
		if (!isAuthenticated) return;
		getAccessTokenSilently()
			.then(async (token) => {
				const currentUser = user!;
				if (currentUser.sub === undefined)
					throw new Error('Token error: No subject claim in access token');

				const payload = jwt.decode(token, { json: true });
				if (!payload)
					throw new Error(
						'Token error: Cannot retrieve payload from access token.'
					);

				const permissions = (currentUser['roles'] as string[])
					.map((value) => {
						const entry = Object.entries(PermissionEnum).find(
							([, v]) => v === value
						);
						if (entry === undefined) return null;

						return entry[0] as PermissionKey;
					})
					.filter((permission) => permission !== null);
				setState((pre) => ({
					...pre,
					user: {
						id: currentUser.sub!,
						...currentUser,
						permissions,
					},
				}));

				tokenHolder.setAccessToken(token);
			})
			.catch(async (err) => {
				console.error(err);
				await logout();
			});
	}, [getAccessTokenSilently, isAuthenticated, logout, user]);

	return (
		<AuthzContext.Provider value={state}>{children}</AuthzContext.Provider>
	);
};

export default AuthzProvider;
