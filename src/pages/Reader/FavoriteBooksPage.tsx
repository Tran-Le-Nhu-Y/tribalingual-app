import { Row, Col, App, Empty } from 'antd';
import { Guard, LoadingScreen, StoryCard } from '../../components';
import { useGetAllFavoritedStoriesByUser } from '../../service';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { PathHolders, RoutePaths } from '../../util';

const FavoriteBooksPage = () => {
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();
	const { user } = useAuth0();
	const navigate = useNavigate();
	const {
		data: stories,
		isError,
		isLoading,
	} = useGetAllFavoritedStoriesByUser({
		userId: user?.sub || '',
	});

	if (isError) {
		notification.error({
			message: t('dataLoadingError'),
			placement: 'topRight',
		});
	}

	if (isLoading) {
		return <LoadingScreen />;
	}
	if (!stories || stories.length === 0) {
		return (
			<Guard requiredPermissions={['READ_STORY']}>
				<Empty description={t('noFavoriteStories')} />
			</Guard>
		);
	}
	return (
		<Guard requiredPermissions={['READ_STORY', 'READ_FILE', 'READ_FAVORITE']}>
			<Row gutter={[16, 24]}>
				{stories.map((story) => (
					<Col
						key={story.id}
						xs={{ flex: '100%' }}
						sm={{ flex: '50%' }}
						md={{ flex: '40%' }}
						lg={{ flex: '20%' }}
						xl={{ flex: '10%' }}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<StoryCard
								title={story.title}
								description={story.description}
								imageUrl={story.file?.url || './default-cover.jpg'}
								likes={story.favoriteCount || 0}
								views={story.viewCount || 0}
								onDetailClick={() =>
									navigate(
										RoutePaths.STORY_DETAIL.replace(
											`:${PathHolders.STORY_ID}`,
											story.id,
										),
									)
								}
							/>
						</div>
					</Col>
				))}
			</Row>
		</Guard>
	);
};

export default FavoriteBooksPage;
