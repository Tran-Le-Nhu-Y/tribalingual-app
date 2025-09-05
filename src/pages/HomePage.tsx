import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {
	RocketOutlined,
	CheckCircleOutlined,
	HeartOutlined,
	TrophyOutlined,
} from '@ant-design/icons';
import { RankingList } from '../components';

const HomePage = () => {
	const { t } = useTranslation();
	const mockRanking = [
		{
			id: 1,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 120,
			views: 300,
			isVip: true,
		},
		{
			id: 2,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 98,
			views: 250,
			isVip: true,
		},
		{
			id: 3,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 4,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 5,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 6,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 7,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 8,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 9,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 10,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
		{
			id: 11,
			title: 'Mưa đỏ',
			description: 'Một tác phẩm đầy cảm xúc...',
			image: './public/mimi.jpg',
			likes: 75,
			views: 210,
		},
	];

	const stats = [
		{
			value: 1,
			label: t('reading'),
			icon: <RocketOutlined style={{ color: '#ff4d4f' }} />,
			bgColor: '#fff1f0',
		},
		{
			value: 10,
			label: t('read'),
			icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
			bgColor: '#f6ffed',
		},
		{
			value: 4,
			label: t('favorite'),
			icon: <HeartOutlined style={{ color: '#ff4d4f' }} />,
			bgColor: '#f0f5ff',
		},
		{
			value: 5,
			label: t('achievements'),
			icon: <TrophyOutlined style={{ color: '#faad14' }} />,
			bgColor: '#fffbe6',
		},
	];
	return (
		<>
			<Row gutter={[16, 16]}>
				{stats.map((item, idx) => (
					<Col
						key={idx}
						xs={12} // mobile: 2 columns
						sm={12} // small tablet: 2 columns
						md={12} // large tablet: 2 columns
						lg={6} // desktop: 4 columns (24/6=4)
					>
						<div
							style={{
								background: '#fff',
								borderRadius: 8,
								padding: '8px',
								textAlign: 'center',
								boxShadow: '0 2px 3px rgba(0,0,0,0.08)',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 8,
								}}
							>
								<div
									style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}
								>
									{item.value}
								</div>
								<span
									style={{
										fontSize: 24,
										background: item.bgColor,
										padding: 6,
										borderRadius: 6,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{item.icon}
								</span>
							</div>

							<div style={{ color: '#555' }}>{item.label}</div>
						</div>
					</Col>
				))}
			</Row>
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
					items={mockRanking}
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
