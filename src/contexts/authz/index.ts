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
	| 'DELETE_GENRE'
	| 'READ_FILE'
	| 'CREATE_FILE'
	| 'UPDATE_FILE'
	| 'DELETE_FILE'
	| 'READ_STORY'
	| 'CREATE_STORY'
	| 'UPDATE_STORY'
	| 'DELETE_STORY'
	| 'PUBLISH_STORY'
	| 'READ_COMMENT'
	| 'CREATE_COMMENT'
	| 'DELETE_COMMENT'
	| 'CREATE_FAVORITE'
	| 'DELETE_FAVORITE'
	| 'CREATE_VIEW'
	| 'READ_STORY_HISTORY'
	| 'CREATE_STORY_HISTORY'
	| 'DELETE_STORY_HISTORY'
	| 'READ_USER';

export const PermissionEnum: Record<PermissionKey, string> = {
	READ_GENRE: 'read:genre',
	CREATE_GENRE: 'create:genre',
	UPDATE_GENRE: 'update:genre',
	DELETE_GENRE: 'delete:genre',

	READ_FILE: 'read:file',
	CREATE_FILE: 'create:file',
	UPDATE_FILE: 'update:file',
	DELETE_FILE: 'delete:file',

	READ_STORY: 'read:story',
	CREATE_STORY: 'create:story',
	UPDATE_STORY: 'update:story',
	DELETE_STORY: 'delete:story',
	PUBLISH_STORY: 'publish:story',
	READ_COMMENT: 'read:comment',
	CREATE_COMMENT: 'create:comment',
	DELETE_COMMENT: 'delete:comment',
	CREATE_FAVORITE: 'create:favorite',
	DELETE_FAVORITE: 'delete:favorite',
	CREATE_VIEW: 'create:view',

	READ_STORY_HISTORY: 'read:story_history',
	CREATE_STORY_HISTORY: 'create:story_history',
	DELETE_STORY_HISTORY: 'delete:story_history',

	READ_USER: 'read:users',
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
		options?: RedirectLoginOptions<AppState>,
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
