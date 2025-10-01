import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import StoryCard from './StoryCard';
import { useTranslation } from 'react-i18next';

interface NewBookItem {
	id: number;
	title: string;
	description?: string;
	image: string;
	likes: number;
	views: number;
}

interface NewBooksListProps {
	title?: string;
	items: NewBookItem[];
}

const NewBooksList: React.FC<NewBooksListProps> = ({ items, title }) => {
	const { t } = useTranslation('standard');
	const [visibleCount, setVisibleCount] = useState(8); // số sách hiển thị ban đầu

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + 8); // mỗi lần load thêm 8
	};

	return (
		<div
			style={{
				background: 'linear-gradient(135deg, #0e2129ff,#0c5f80ff )',
				padding: '0px 8px 20px 8px',
				marginTop: 20,
				position: 'relative',
				borderRadius: 8,
			}}
		>
			<Title
				style={{
					paddingTop: 10,
					color: '#f9fbff',
					fontSize: 24,
					fontWeight: 700,
					letterSpacing: 1,
					marginBottom: 20,
				}}
				level={3}
			>
				{title || t('newBooks')}
			</Title>

			{/* <div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
					gap: 20,
				}}
			>
				{items.slice(0, visibleCount).map((item) => (
					<div
						key={item.id}
						style={{
							transition: 'transform 0.3s',
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.transform = 'scale(1.03)')
						}
						onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
					>
						<StoryCard
							title={item.title}
							image={item.image}
							likes={item.likes}
							views={item.views}
							onDetailClick={() => console.log('Xem chi tiết', item.title)}
						/>
					</div>
				))}
			</div> */}
			<Row gutter={[16, 24]}>
				{items.slice(0, visibleCount).map((item) => {
					const key = item.id;
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
									width: 292,
								}}
							>
								<StoryCard
									title={item.title}
									description={item.description}
									imageUrl={item.image}
									likes={item.likes}
									views={item.views}
									onDetailClick={() => console.log('Xem chi tiết', item.title)}
								/>
							</div>
						</Col>
					);
				})}
			</Row>

			{visibleCount < items.length && (
				<div style={{ textAlign: 'center', marginTop: 20 }}>
					<Button
						type="primary"
						onClick={handleLoadMore}
						style={{
							background: '#3396D3',
							border: 'none',
							fontWeight: 600,
							padding: '0 30px',
							height: 40,
							borderRadius: 6,
						}}
					>
						{t('loadMore')}
					</Button>
				</div>
			)}
		</div>
	);
};

export default NewBooksList;
