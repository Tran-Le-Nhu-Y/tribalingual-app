import { App } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { syncUser } from '../service/api/auth';

export const useAuthUserId = () => {
	const { user, isAuthenticated } = useAuth0();
	const { notification } = App.useApp();
	const { t } = useTranslation('standard');
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		const storedId = localStorage.getItem('userId');
		if (storedId) {
			setUserId(storedId);
			return;
		}

		if (isAuthenticated && user?.sub) {
			syncUser({
				sub: user.sub,
				name: user.name || user.nickname || 'Unknown',
				email: user.email,
				picture: user.picture,
			})
				.then((res) => {
					const id = res.data.id;
					localStorage.setItem('userId', id);
					setUserId(id);
				})
				.catch(() => {
					notification.error({
						message: t('userSyncError'),
						description: t('pleaseLoginAgain'),
						placement: 'topRight',
					});
				});
		}
	}, [user, isAuthenticated, notification, t]);

	const getUserId = () => {
		if (!userId) {
			notification.error({
				message: t('notAuthenticated'),
				description: t('pleaseLoginAgain'),
				placement: 'topRight',
			});
			return null;
		}
		return userId;
	};

	return { getUserId };
};
