import { useTranslation } from 'react-i18next';

import { RankingList } from '../../components';

const HomePage = () => {
	const { t } = useTranslation('standard');
	const mockRanking = [
		{
			id: 1,
			title: 'Mưa đỏ  Mưa đỏ Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 120,
			views: 300,
			isVip: true,
		},
		{
			id: 2,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 98,
			views: 250,
			isVip: true,
		},
		{
			id: 3,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 4,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 5,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 6,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 7,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 8,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 9,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 10,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 11,
			title: 'Mưa đỏ',
			//description: 'Một tác phẩm đầy cảm xúc...',
			image: '/mimi.jpg',
			likes: 75,
			views: 210,
		},
	];

	return (
		<>
			<div>
				<RankingList title={t('mostRead')} items={mockRanking} maxItems={8} />
			</div>
			<div>
				<RankingList
					title={t('mostFavorited')}
					items={mockRanking}
					maxItems={8}
				/>
			</div>
			<div>
				<RankingList
					title={t('newBooks')}
					items={[]}
					showRankingNumber={false}
				/>
			</div>
			{/* <Row>
				<Title level={3}>Sách mới</Title>
			</Row>

			<Row gutter={[16, 24]}>
				{Array.from({ length: 12 }).map((_, index) => {
					const key = `col-${index}`;
					return (
						<Col
							key={key}
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
									title="Cổ tích người H’mông"
									description="Trên ngọn núi cao nọ, có một cái hang lớn. Trong hang có một con quỷ dữ. Ngày nọ, có một chàng trai tên là A Lý, người H’mông, rất dũng cảm và thông minh. A Lý quyết định sẽ vào hang để đánh bại con quỷ và cứu dân làng."
									image="./public/mimi.jpg"
									likes={10}
									views={300}
									onDetailClick={() => console.log('Xem chi tiết truyện')}
								/>
							</div>
						</Col>
					);
				})}
			</Row> */}
		</>
	);
};

export default HomePage;
