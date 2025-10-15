import { useMemo, type PropsWithChildren } from 'react';
import { useAuthz, type PermissionKey } from '../contexts/authz';

interface GuardProps extends PropsWithChildren {
	requiredPermissions: PermissionKey[];
	checkAll?: boolean;
}

const Guard = ({
	requiredPermissions,
	checkAll = false,
	children,
}: GuardProps) => {
	const authData = useAuthz();
	const isPermit = useMemo(() => {
		const user = authData.user;
		if (user === undefined) return false;

		const fn = (permission: PermissionKey) =>
			user.permissions.includes(permission);
		return checkAll
			? requiredPermissions.every(fn)
			: requiredPermissions.some(fn);
	}, [authData.user, checkAll, requiredPermissions]);

	return isPermit ? <>{children}</> : <></>;
};

export default Guard;
