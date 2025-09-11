import { Row, Col } from 'antd';
import { StoryCard } from '../../components';

const FavoriteBooksPage = () => {
	return (
		<>
			<Row gutter={[16, 24]}>
				{Array.from({ length: 2 }).map((_, index) => {
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
									image="./mimi.jpg"
									likes={10}
									views={300}
									onDetailClick={() => console.log('Xem chi tiết truyện')}
								/>
							</div>
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default FavoriteBooksPage;
