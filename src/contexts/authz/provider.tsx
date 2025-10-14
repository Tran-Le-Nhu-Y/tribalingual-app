import { useAuth0 } from '@auth0/auth0-react';
import { AuthzContext, type AuthzData } from '.';
import { useMemo, type PropsWithChildren } from 'react';
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
	const state = useMemo<AuthzData>(() => {
		let currentUser: AuthzData['user'] = undefined;
		if (isAuthenticated) {
			jwt.decode();
		}

		return {
			user: currentUser,
			isLoading: isLoading,
			isAuthenticated: isAuthenticated,
			loginWithRedirect: loginWithRedirect,
			logout: logout,
		};
	}, []);

	return (
		<AuthzContext.Provider value={state}>{children}</AuthzContext.Provider>
	);
};

export default AuthzProvider;
