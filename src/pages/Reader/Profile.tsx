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
	Tooltip,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
	CheckCircleOutlined,
	HeartOutlined,
	EyeOutlined,
	LikeOutlined,
	MessageOutlined,
	EditOutlined,
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
			views: 0,
			likes: 0,
			comments: 0,
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
	];

	return (
		<>
			{/* --- Stats Section --- */}
			<Row gutter={[16, 16]} justify="center">
				{stats.map((item, idx) => (
					<Col key={idx} xs={12} sm={12} md={10} lg={8} xl={6}>
						<Card hoverable style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
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

			<Space
				direction="vertical"
				style={{ width: '100%', margin: '24px 0' }}
				size="large"
			>
				{stories.map((story) => (
					<Card
						key={story.id}
						style={{
							borderRadius: 12,
							boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
						}}
						hoverable
					>
						{story.status === 'Pending' && (
							<Tooltip title={t('update')} color="geekblue">
								<EditOutlined
									onClick={() => {
										console.log('Cập nhật câu chuyện:', story.id);
										// TODO: mở modal cập nhật hoặc điều hướng đến trang edit
									}}
									style={{
										fontSize: 20,
										color: '#1890ff',
										cursor: 'pointer',
										position: 'absolute',
										top: 10,
										right: 12,
										padding: 4,
										borderRadius: 6,
										transition: 'background 0.2s',
									}}
									onMouseEnter={(e) => {
										(e.currentTarget as HTMLElement).style.background =
											'#e6f7ff';
									}}
									onMouseLeave={(e) => {
										(e.currentTarget as HTMLElement).style.background =
											'transparent';
									}}
								/>
							</Tooltip>
						)}
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={24} lg={8} xl={6}>
								<Row gutter={[16, 16]} align="top">
									<Col
										xs={8}
										sm={8}
										md={10}
										lg={24}
										style={{ textAlign: 'center' }}
									>
										<Image
											width={120}
											height={140}
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
									<Col xs={14} sm={14} md={12} lg={24}>
										<Descriptions
											column={1}
											size="small"
											colon={false}
											labelStyle={{ width: 120, fontWeight: 500 }}
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
											<Descriptions.Item label="Ngày đăng">
												<Text type="secondary" style={{ fontSize: 13 }}>
													{story.createdAt ?? 'Chưa'}
												</Text>
											</Descriptions.Item>
											<Descriptions.Item label="Ngày phát hành">
												<Text type="secondary" style={{ fontSize: 13 }}>
													{story.publishedAt ?? 'Chưa'}
												</Text>
											</Descriptions.Item>
											<Descriptions.Item label="Cập nhật lần cuối">
												<Text type="secondary" style={{ fontSize: 13 }}>
													{story.updatedAt}
												</Text>
											</Descriptions.Item>
										</Descriptions>
									</Col>
								</Row>
							</Col>

							<Col xs={24} sm={24} md={24} lg={16} xl={18}>
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

						<Row
							justify="space-evenly"
							align="middle"
							style={{ color: 'grey', textAlign: 'right' }}
						>
							<Col>
								<EyeOutlined style={{ marginRight: 4 }} />
								{story.views} {t('view')}
							</Col>
							<Col>
								<LikeOutlined style={{ marginRight: 4 }} />
								{story.likes} {t('favorite')}
							</Col>
							<Col>
								<MessageOutlined style={{ marginRight: 4 }} />
								{story.comments} {t('comment')}
							</Col>
						</Row>
					</Card>
				))}
			</Space>
		</>
	);
};

export default ProfilePage;
