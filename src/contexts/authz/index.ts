import type {
	AppState,
	LogoutOptions,
	RedirectLoginOptions,
	User,
} from '@auth0/auth0-react';
import { createContext, useContext } from 'react';

export type Role = 'ADMIN' | 'READER';

export interface AuthenticatedUser extends Omit<User, 'sub'> {
	id: string;
	roles: Role[];
}

export interface AuthzData {
	user?: AuthenticatedUser;
	isLoading: boolean;
	isAuthenticated: boolean;
	loginWithRedirect: (
		options?: RedirectLoginOptions<AppState>,
	) => Promise<void>;
	logout: (options?: LogoutOptions) => Promise<void>;
}

export const AuthzContext = createContext<AuthzData | undefined>(undefined);

export const useAuthz = () => {
	const ctx = useContext(AuthzContext);
	if (ctx === undefined)
		throw new Error('useAuthz must be used within AuthzProvider');
};
