// import { Col, Row } from 'antd';
// import { StoryCard } from '../../components';

// const BookStoragePage = () => {
// 	return (
// 		<>
// 			<Row gutter={[16, 24]} style={{ justifyContent: 'center' }}>
// 				{Array.from({ length: 19 }).map((_, index) => {
// 					const key = `col-${index}`;
// 					return (
// 						<Col
// 							key={key}
// 							xs={{ flex: '100%' }}
// 							sm={{ flex: '50%' }}
// 							md={{ flex: '40%' }}
// 							lg={{ flex: '20%' }}
// 							xl={{ flex: '10%' }}
// 						>
// 							<div
// 								style={{
// 									display: 'flex',
// 									justifyContent: 'center',
// 									alignItems: 'center',
// 								}}
// 							>
// 								<StoryCard
// 									title="Cổ tích người H’mông"
// 									description="Trên ngọn núi cao nọ, có một cái hang lớn. Trong hang có một con quỷ dữ. Ngày nọ, có một chàng trai tên là A Lý, người H’mông, rất dũng cảm và thông minh. A Lý quyết định sẽ vào hang để đánh bại con quỷ và cứu dân làng."
// 									image="./mimi.jpg"
// 									likes={10}
// 									views={300}
// 									onDetailClick={() => console.log('Xem chi tiết truyện')}
// 								/>
// 							</div>
// 						</Col>
// 					);
// 				})}
// 			</Row>
// 		</>
// 	);
// };

// export default BookStoragePage;

import { useState } from 'react';
import { Col, Row, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { StoryCard } from '../../components';

const BookStoragePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(15); // mặc định 8 item/trang

	// Dữ liệu giả
	const stories = Array.from({ length: 210 }).map((_, index) => ({
		id: index,
		title: 'Cổ tích người H’mông',
		description:
			'Trên ngọn núi cao nọ, có một cái hang lớn. Trong hang có một con quỷ dữ. Ngày nọ, có một chàng trai tên là A Lý, người H’mông, rất dũng cảm và thông minh. A Lý quyết định sẽ vào hang để đánh bại con quỷ và cứu dân làng.',
		image: './mimi.jpg',
		likes: 10,
		views: 300,
	}));

	// Xử lý phân trang
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const paginatedStories = stories.slice(startIndex, endIndex);

	// Hàm xử lý thay đổi page hoặc pageSize
	const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
		page,
		newPageSize,
	) => {
		setCurrentPage(page);
		setPageSize(newPageSize);
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
							image={story.image}
							likes={story.likes}
							views={story.views}
							onDetailClick={() => console.log('Xem chi tiết truyện', story.id)}
						/>
					</Col>
				))}
			</Row>
			{/* Pagination */}
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
				<Pagination
					showSizeChanger
					current={currentPage}
					pageSize={pageSize}
					total={stories.length}
					onChange={(page, newPageSize) => {
						setCurrentPage(page);
						setPageSize(newPageSize || pageSize);
					}}
					onShowSizeChange={onShowSizeChange}
				/>
			</div>
		</div>
	);
};

export default BookStoragePage;
