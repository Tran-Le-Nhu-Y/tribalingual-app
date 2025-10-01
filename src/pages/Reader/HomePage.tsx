import { useTranslation } from 'react-i18next';

import { RankingList } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import { SortStoryOption, StoryStatus } from '../../util';
import type { Story } from '../../@types/entities';
import { App } from 'antd';
import { useGetStories } from '../../service';

const HomePage = () => {
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();

	//Get all stories
	const [storiesQuery] = useState<GetQuery>({
		offset: 0,
		limit: 10, //  10 item
	});
	const stories = useGetStories(storiesQuery!, {
		skip: !storiesQuery,
	});
	useEffect(() => {
		if (stories.isError) {
			notification.error({
				message: t('dataLoadingError'),
				description: t('genreLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
	}, [notification, stories.isError, t]);

	const content = useMemo(() => {
		if (stories.isError) return [];
		if (stories.data?.content) {
			return stories.data.content
				.filter((story) => story.status !== StoryStatus.PENDING) // not get story pending
				.map(
					(story) =>
						({
							...story,
							id: story.id,
						} as Story),
				);
		}
		return [];
	}, [stories.data?.content, stories.isError]);
	return (
		<>
			<div>
				<RankingList
					title={t('mostRead')}
					items={content}
					maxItems={10}
					sortOption={SortStoryOption.VIEWCOUNT}
				/>
			</div>
			<div>
				<RankingList
					title={t('mostFavorited')}
					items={content}
					maxItems={10}
					sortOption={SortStoryOption.FAVORITECOUNT}
				/>
			</div>
			<div>
				<RankingList
					title={t('newBooks')}
					items={content}
					showRankingNumber={false}
					maxItems={10}
				/>
			</div>
		</>
	);
};

export default HomePage;
