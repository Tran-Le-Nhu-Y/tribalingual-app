import { useEffect, useMemo, useState } from 'react';
import { Col, Row, Pagination, App } from 'antd';
import type { PaginationProps } from 'antd';
import { StoryCard } from '../../components';
import { useTranslation } from 'react-i18next';
import { useGetFileById, useGetStories } from '../../service';
import type { Story } from '../../@types/entities';
import { StoryStatus } from '../../util';

const BookStoragePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();

	//Get all stories
	const [storiesQuery, setStoriesQuery] = useState<GetQuery>({
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

	// Xử lý phân trang
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const paginatedStories = content.slice(startIndex, endIndex);

	const handlePageChange: PaginationProps['onChange'] = (page, newPageSize) => {
		setCurrentPage(page);
		setPageSize(newPageSize || pageSize);

		setStoriesQuery({
			offset: (page - 1) * (newPageSize || pageSize),
			limit: newPageSize || pageSize,
		});
	};

	const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
		page,
		newPageSize,
	) => {
		setCurrentPage(page);
		setPageSize(newPageSize);

		setStoriesQuery({
			offset: (page - 1) * newPageSize,
			limit: newPageSize,
		});
	};

	const StoryItem = ({ story }: { story: Story }) => {
		const file = useGetFileById(story.fileId!, {
			skip: !story.fileId,
		});
		const imageUrl = file.data?.url || './placeholder.jpg';

		return (
			<Col
				key={story.id}
				xs={{ flex: '100%' }}
				sm={{ flex: '50%' }}
				md={{ flex: '40%' }}
				lg={{ flex: '20%' }}
			>
				<StoryCard
					title={story.title}
					description={story.description}
					imageUrl={imageUrl}
					likes={story.favoriteCount}
					views={story.viewCount}
					onDetailClick={() => console.log('Xem chi tiết truyện', story.id)}
				/>
			</Col>
		);
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				maxWidth: 1200,
				margin: '0 auto',
			}}
		>
			<Row gutter={[16, 24]} style={{ justifyContent: 'flex-start' }}>
				{paginatedStories.map((story) => (
					<StoryItem key={story.id} story={story} />
				))}
			</Row>
			{/* Pagination */}
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
				<Pagination
					showSizeChanger
					current={currentPage}
					pageSize={pageSize}
					total={stories.data?.total_elements || 0}
					onChange={handlePageChange}
					onShowSizeChange={onShowSizeChange}
				/>
			</div>
		</div>
	);
};

export default BookStoragePage;
