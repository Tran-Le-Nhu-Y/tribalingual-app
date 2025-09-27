// import {
// 	Col,
// 	Row,
// 	Card,
// 	Tag,
// 	Space,
// 	Typography,
// 	Divider,
// 	Image,
// 	Descriptions,
// } from 'antd';
// import { useTranslation } from 'react-i18next';
// import {
// 	RocketOutlined,
// 	CheckCircleOutlined,
// 	HeartOutlined,
// 	TrophyOutlined,
// 	EyeOutlined,
// 	LikeOutlined,
// 	MessageOutlined,
// } from '@ant-design/icons';

// const { Title, Paragraph, Text } = Typography;

// interface Story {
// 	id: string;
// 	title: string;
// 	thumbnail: string;
// 	description: string;
// 	genre: string;
// 	language: string;
// 	status: string;
// 	createdAt: string;
// 	publishedAt?: string;
// 	updatedAt: string;
// 	views: number;
// 	likes: number;
// 	comments: number;
// }

// const ProfilePage = () => {
// 	const { t } = useTranslation();

// 	// fake data stories
// 	const stories: Story[] = [
// 		{
// 			id: '1',
// 			title: 'Chuyện cổ tích H’Mông',
// 			thumbnail: 'https://picsum.photos/120/90?random=1',
// 			description:
// 				'Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam.',
// 			genre: 'Truyện dân gian',
// 			language: 'Hmong',
// 			status: 'Pending',
// 			createdAt: '2025-09-01',
// 			publishedAt: '2025-09-01',
// 			updatedAt: '2025-09-05',
// 			views: 120,
// 			likes: 45,
// 			comments: 12,
// 		},
// 		{
// 			id: '2',
// 			title: 'Truyền thuyết Con Rồng Cháu Tiên',
// 			thumbnail: 'https://picsum.photos/120/90?random=2',
// 			description:
// 				'Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam.',
// 			genre: 'Truyền thuyết',
// 			language: 'Vietnamese',
// 			status: 'Published',
// 			createdAt: '2025-08-15',
// 			publishedAt: '2025-08-20',
// 			updatedAt: '2025-09-01',
// 			views: 520,
// 			likes: 200,
// 			comments: 85,
// 		},
// 	];

// 	const stats = [
// 		{
// 			value: 1,
// 			label: t('reading'),
// 			icon: <RocketOutlined style={{ color: '#ff4d4f' }} />,
// 			bgColor: '#fff1f0',
// 		},
// 		{
// 			value: 10,
// 			label: t('read'),
// 			icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
// 			bgColor: '#f6ffed',
// 		},
// 		{
// 			value: 4,
// 			label: t('favorite'),
// 			icon: <HeartOutlined style={{ color: '#ff4d4f' }} />,
// 			bgColor: '#f0f5ff',
// 		},
// 		{
// 			value: 5,
// 			label: t('achievements'),
// 			icon: <TrophyOutlined style={{ color: '#faad14' }} />,
// 			bgColor: '#fffbe6',
// 		},
// 	];

// 	return (
// 		<>
// 			{/* Stats */}
// 			<Row gutter={[16, 16]}>
// 				{stats.map((item, idx) => (
// 					<Col key={idx} xs={12} sm={12} md={12} lg={6}>
// 						<div
// 							style={{
// 								background: '#fff',
// 								borderRadius: 8,
// 								padding: '8px',
// 								textAlign: 'center',
// 								boxShadow: '0 2px 3px rgba(0,0,0,0.08)',
// 							}}
// 						>
// 							<div
// 								style={{
// 									display: 'flex',
// 									alignItems: 'center',
// 									justifyContent: 'center',
// 									gap: 8,
// 								}}
// 							>
// 								<div
// 									style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}
// 								>
// 									{item.value}
// 								</div>
// 								<span
// 									style={{
// 										fontSize: 24,
// 										background: item.bgColor,
// 										padding: 6,
// 										borderRadius: 6,
// 										display: 'flex',
// 										alignItems: 'center',
// 										justifyContent: 'center',
// 									}}
// 								>
// 									{item.icon}
// 								</span>
// 							</div>
// 							<div style={{ color: '#555' }}>{item.label}</div>
// 						</div>
// 					</Col>
// 				))}
// 			</Row>

// 			<Divider />

// 			{/* User's Stories */}
// 			<Title level={3}>{t('myStories') || 'Câu chuyện của tôi'}</Title>
// 			<Space direction="vertical" style={{ width: '100%' }} size="large">
// 				{stories.map((story) => (
// 					<Card
// 						key={story.id}
// 						bodyStyle={{ padding: 16 }}
// 						style={{
// 							borderRadius: 12,
// 							boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
// 						}}
// 						hoverable
// 					>
// 						<Row gutter={16} align="stretch">
// 							<Col flex="400px" style={{ marginBottom: 10 }}>
// 								<Row style={{ justifyContent: 'space-between' }}>
// 									<Image
// 										width={140}
// 										height={100}
// 										style={{
// 											borderRadius: 8,
// 											objectFit: 'cover',
// 											boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
// 										}}
// 										src={story.thumbnail}
// 										alt={story.title}
// 										preview={false}
// 									/>
// 									<Col flex="180px">
// 										<Descriptions
// 											column={1}
// 											size="small"
// 											colon={false}
// 											labelStyle={{ width: 80, fontWeight: 500 }}
// 											contentStyle={{ marginLeft: 8 }}
// 										>
// 											<Descriptions.Item label="Thể loại">
// 												<Tag color="blue">{story.genre}</Tag>
// 											</Descriptions.Item>
// 											<Descriptions.Item label="Ngôn ngữ">
// 												<Tag color="purple">{story.language}</Tag>
// 											</Descriptions.Item>
// 											<Descriptions.Item label="Trạng thái">
// 												<Tag
// 													color={
// 														story.status === 'Published' ? 'green' : 'orange'
// 													}
// 												>
// 													{story.status}
// 												</Tag>
// 											</Descriptions.Item>
// 										</Descriptions>
// 									</Col>
// 								</Row>
// 								<Row
// 									style={{
// 										marginTop: 8,
// 										marginBottom: 8,
// 										justifyContent: 'space-between',
// 									}}
// 								>
// 									<Text type="secondary" style={{ fontSize: 12 }}>
// 										Ngày đăng: {story.createdAt}
// 									</Text>
// 									<Text type="secondary" style={{ fontSize: 12 }}>
// 										Publish: {story.publishedAt ?? 'Chưa'}
// 									</Text>
// 									<Text type="secondary" style={{ fontSize: 12 }}>
// 										Cập nhật: {story.updatedAt}
// 									</Text>
// 								</Row>
// 								<Row
// 									justify="space-between"
// 									style={{ fontSize: 13, color: 'grey' }}
// 								>
// 									<Col>
// 										<EyeOutlined style={{ marginRight: 4 }} />
// 										{story.views} lượt xem
// 									</Col>
// 									<Col>
// 										<LikeOutlined style={{ marginRight: 4 }} />
// 										{story.likes} lượt thích
// 									</Col>
// 									<Col>
// 										<MessageOutlined style={{ marginRight: 4 }} />
// 										{story.comments} bình luận
// 									</Col>
// 								</Row>
// 							</Col>

// 							<Col flex="auto" style={{ marginTop: 10 }}>
// 								<Space direction="vertical" size={4}>
// 									<Text strong style={{ fontSize: 16 }}>
// 										{story.title}
// 									</Text>
// 									<Paragraph
// 										type="secondary"
// 										style={{
// 											width: '100%',
// 											textAlign: 'justify',
// 										}}
// 										ellipsis={{
// 											rows: 4,
// 											tooltip: story.description,
// 										}}
// 									>
// 										{story.description}
// 									</Paragraph>
// 								</Space>
// 							</Col>
// 						</Row>
// 					</Card>
// 				))}
// 			</Space>
// 		</>
// 	);
// };

// export default ProfilePage;
import {
	Col,
	Row,
	Card,
	Tag,
	Space,
	Typography,
	Divider,
	Image,
	Descriptions,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
	RocketOutlined,
	CheckCircleOutlined,
	HeartOutlined,
	TrophyOutlined,
	EyeOutlined,
	LikeOutlined,
	MessageOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface Story {
	id: string;
	title: string;
	thumbnail: string;
	description: string;
	genre: string;
	language: string;
	status: string;
	createdAt: string;
	publishedAt?: string;
	updatedAt: string;
	views: number;
	likes: number;
	comments: number;
}

// Hàm để trả về màu Tag dựa trên trạng thái (sử dụng chuyên nghiệp hơn)
const getStatusTag = (status: string) => {
	switch (status) {
		case 'Published':
			return <Tag color="green">Đã đăng</Tag>;
		case 'Pending':
			return <Tag color="orange">Đang chờ</Tag>;
		case 'Draft':
			return <Tag color="default">Bản nháp</Tag>;
		default:
			return <Tag>{status}</Tag>;
	}
};

const ProfilePage = () => {
	const { t } = useTranslation();

	// fake data stories
	const stories: Story[] = [
		{
			id: '1',
			title: 'Chuyện cổ tích H’Mông',
			thumbnail: 'https://picsum.photos/140/100?random=1',
			description:
				'Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam.',
			genre: 'Truyện dân gian',
			language: 'Hmong',
			status: 'Pending',
			createdAt: '2025-09-01',
			publishedAt: '2025-09-01',
			updatedAt: '2025-09-05',
			views: 120,
			likes: 45,
			comments: 12,
		},
		{
			id: '2',
			title: 'Truyền thuyết Con Rồng Cháu Tiên',
			thumbnail: 'https://picsum.photos/140/100?random=2',
			description:
				'Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam. Câu chuyện về nguồn gốc dân tộc Việt Nam.',
			genre: 'Truyền thuyết',
			language: 'Vietnamese',
			status: 'Published',
			createdAt: '2025-08-15',
			publishedAt: '2025-08-20',
			updatedAt: '2025-09-01',
			views: 520,
			likes: 200,
			comments: 85,
		},
	];

	const stats = [
		{
			value: 1,
			label: t('reading') || 'Đang đọc',
			icon: <RocketOutlined style={{ color: '#ff4d4f' }} />,
			bgColor: '#fff1f0',
		},
		{
			value: 10,
			label: t('read') || 'Đã đọc',
			icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
			bgColor: '#f6ffed',
		},
		{
			value: 4,
			label: t('favorite') || 'Yêu thích',
			icon: <HeartOutlined style={{ color: '#ff4d4f' }} />,
			bgColor: '#f0f5ff',
		},
		{
			value: 5,
			label: t('achievements') || 'Thành tích',
			icon: <TrophyOutlined style={{ color: '#faad14' }} />,
			bgColor: '#fffbe6',
		},
	];

	return (
		<>
			{/* --- Stats Section --- */}
			<Row gutter={[16, 16]}>
				{stats.map((item, idx) => (
					<Col key={idx} xs={12} sm={12} md={12} lg={6}>
						<Card
							bordered={false}
							hoverable
							style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 12,
								}}
							>
								<span
									style={{
										fontSize: 28,
										background: item.bgColor,
										padding: 10,
										borderRadius: '50%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										minWidth: 48,
										minHeight: 48,
									}}
								>
									{item.icon}
								</span>
								<div>
									<div
										style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 1 }}
									>
										{item.value}
									</div>
									<div style={{ color: '#555', marginTop: 4 }}>
										{item.label}
									</div>
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			<Divider orientation="left" style={{ margin: '24px 0' }}>
				<Title level={3} style={{ margin: 0 }}>
					{t('myStories') || 'Câu chuyện của tôi'}
				</Title>
			</Divider>

			{/* --- User's Stories List --- */}
			<Space direction="vertical" style={{ width: '100%' }} size="large">
				{stories.map((story) => (
					<Card
						key={story.id}
						bodyStyle={{ padding: 16 }}
						style={{
							borderRadius: 12,
							boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
						}}
						hoverable
					>
						{/* Phần trên: Ảnh, Tags, Mô tả (giữ nguyên) */}
						<Row gutter={[16, 16]}>
							{/* Cột 1: Ảnh & Thông tin Tags */}
							<Col xs={24} sm={24} md={8} lg={6}>
								<Row gutter={[16, 16]} align="top">
									<Col
										xs={8}
										sm={6}
										md={24}
										lg={24}
										style={{ textAlign: 'center' }}
									>
										<Image
											width="100%"
											height={100}
											style={{
												borderRadius: 8,
												objectFit: 'cover',
												boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
											}}
											src={story.thumbnail}
											alt={story.title}
											preview={false}
										/>
									</Col>
									<Col xs={16} sm={18} md={24} lg={24}>
										<Descriptions
											column={1}
											size="small"
											colon={false}
											labelStyle={{ width: 80, fontWeight: 500 }}
											contentStyle={{ marginLeft: 8 }}
										>
											<Descriptions.Item label="Thể loại">
												<Tag color="blue">{story.genre}</Tag>
											</Descriptions.Item>
											<Descriptions.Item label="Ngôn ngữ">
												<Tag color="purple">{story.language}</Tag>
											</Descriptions.Item>
											<Descriptions.Item label="Trạng thái">
												{getStatusTag(story.status)}
											</Descriptions.Item>
										</Descriptions>
									</Col>
								</Row>
							</Col>

							{/* Cột 2: Tiêu đề và Mô tả */}
							<Col xs={24} sm={24} md={16} lg={18}>
								<Space
									direction="vertical"
									size={8}
									style={{ width: '100%', minHeight: 140 }}
								>
									<Title level={4} style={{ margin: 0 }}>
										{story.title}
									</Title>
									<Paragraph
										type="secondary"
										style={{ width: '100%', textAlign: 'justify' }}
										ellipsis={{
											rows: 4,
											tooltip: story.description,
										}}
									>
										{story.description}
									</Paragraph>
								</Space>
							</Col>
						</Row>

						<Divider style={{ margin: '12px 0' }} />

						{/* Hàng cuối ĐÃ SỬA: Ngày tháng & Thống kê lượt xem (Responsive Footer) */}
						<Row justify="space-between" align="middle" gutter={[16, 8]}>
							{/* Cột 1: Thông tin ngày tháng */}
							<Col xs={24} sm={24} md={24} lg={12}>
								{/* Sử dụng Row thay vì Space để kiểm soát bố cục tốt hơn trên các kích thước */}
								<Row gutter={[16, 8]} wrap>
									<Col>
										<Text type="secondary" style={{ fontSize: 12 }}>
											<Text strong>Đăng:</Text> {story.createdAt}
										</Text>
									</Col>
									<Col>
										<Text type="secondary" style={{ fontSize: 12 }}>
											<Text strong>Phát hành:</Text>{' '}
											{story.publishedAt ?? 'Chưa'}
										</Text>
									</Col>
									<Col>
										<Text type="secondary" style={{ fontSize: 12 }}>
											<Text strong>Cập nhật:</Text> {story.updatedAt}
										</Text>
									</Col>
								</Row>
							</Col>

							{/* Cột 2: Thống kê lượt xem */}
							<Col
								xs={24}
								sm={24}
								md={24}
								lg={12}
								style={{ color: 'grey', textAlign: 'right' }}
							>
								{/* Sử dụng Row với justify="end" và gutter để đảm bảo hiển thị đẹp */}
								<Row gutter={[16, 8]} justify={{ xs: 'start', lg: 'end' }} wrap>
									<Col>
										<EyeOutlined style={{ marginRight: 4 }} />
										{story.views} lượt xem
									</Col>
									<Col>
										<LikeOutlined style={{ marginRight: 4 }} />
										{story.likes} lượt thích
									</Col>
									<Col>
										<MessageOutlined style={{ marginRight: 4 }} />
										{story.comments} bình luận
									</Col>
								</Row>
							</Col>
						</Row>
					</Card>
				))}
			</Space>
		</>
	);
};

export default ProfilePage;
