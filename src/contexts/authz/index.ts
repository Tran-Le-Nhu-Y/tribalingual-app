import type {
	AppState,
	LogoutOptions,
	RedirectLoginOptions,
	User,
} from '@auth0/auth0-react';
import { createContext, useContext } from 'react';

export type PermissionKey =
	| 'READ_GENRE'
	| 'CREATE_GENRE'
	| 'UPDATE_GENRE'
	| 'DELETE_GENRE';

export const PermissionEnum: Record<PermissionKey, string> = {
	READ_GENRE: 'read:genre',
	CREATE_GENRE: 'create:genre',
	UPDATE_GENRE: 'update:genre',
	DELETE_GENRE: 'delete:genre',
};

export interface AuthenticatedUser extends Omit<User, 'sub'> {
	id: string;
	permissions: PermissionKey[];
}

export interface AuthzData {
	user?: AuthenticatedUser;
	isLoading: boolean;
	isAuthenticated: boolean;
	loginWithRedirect: (
		options?: RedirectLoginOptions<AppState>
	) => Promise<void>;
	logout: (options?: LogoutOptions) => Promise<void>;
}

export const AuthzContext = createContext<AuthzData | undefined>(undefined);

export const useAuthz = () => {
	const ctx = useContext(AuthzContext);
	if (ctx === undefined)
		throw new Error('useAuthz must be used within AuthzProvider');
	return ctx;
};

export class TokenHolder {
	private accessToken: string | undefined;

	constructor() {
		this.accessToken = undefined;
	}

	getAccessToken() {
		return this.accessToken;
	}

	setAccessToken(token: string) {
		this.accessToken = token;
	}
}

export const tokenHolder = new TokenHolder();
