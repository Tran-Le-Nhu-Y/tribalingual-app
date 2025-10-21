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
	App,
	Button,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
	EyeOutlined,
	LikeOutlined,
	MessageOutlined,
	EditOutlined,
	EyeFilled,
} from '@ant-design/icons';
import { Guard } from '../../components';
import { useAuth0 } from '@auth0/auth0-react';
import type { GetStoryQuery } from '../../@types/queries';
import { useEffect, useMemo, useState } from 'react';
import { useGetStories } from '../../service';
import type { Story } from '../../@types/entities';
import { PathHolders, RoutePaths, StoryStatus } from '../../util';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

const { Title, Paragraph, Text } = Typography;

const ProfilePage = () => {
	const { t } = useTranslation();
	const { notification } = App.useApp();
	const { user } = useAuth0();
	const navigate = useNavigate();

	const getStatusTag = (status: string) => {
		switch (status) {
			case 'PUBLISHED':
				return <Tag color="green">{t('published')}</Tag>;
			case 'PENDING':
				return <Tag color="orange">{t('pending')}</Tag>;
			case 'REJECTED':
				return <Tag color="red">{t('rejected')}</Tag>;
			case 'UPDATED':
				return <Tag color="blue">{t('updated')}</Tag>;
			default:
				return <Tag>{status}</Tag>;
		}
	};

	//Get all stories
	const [storiesQuery] = useState<GetStoryQuery>({
		offset: 0,
		limit: 10, //  10 item
		authorId: user?.sub,
	});
	const stories = useGetStories(storiesQuery!, {
		skip: !storiesQuery,
	});
	useEffect(() => {
		if (stories.isError) {
			notification.error({
				message: t('dataLoadingError'),
				description: t('storiesLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
	}, [notification, stories.isError, t]);

	const content = useMemo(() => {
		if (stories.isError) return [];
		if (stories.data?.content)
			return stories.data.content.map(
				(story) =>
					({
						...story,
						id: story.id,
					} as Story),
			);
		return [];
	}, [stories.data?.content, stories.isError]);

	// const stats = [
	// 	{
	// 		value: 10,
	// 		label: t('read') || 'Đã đọc',
	// 		icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
	// 		bgColor: '#f6ffed',
	// 	},
	// 	{
	// 		value: 4,
	// 		label: t('favorite') || 'Yêu thích',
	// 		icon: <HeartOutlined style={{ color: '#ff4d4f' }} />,
	// 		bgColor: '#f0f5ff',
	// 	},
	// ];

	return (
		<Guard requiredPermissions={['READ_STORY']}>
			{/* --- Stats Section --- */}
			{/* <Row gutter={[16, 16]} justify="center">
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
			</Row> */}

			<Space
				direction="vertical"
				style={{ width: '100%', margin: '24px 0' }}
				size="large"
			>
				{content.map((story) => (
					<Card
						key={story.id}
						style={{
							borderRadius: 12,
							boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
						}}
						hoverable
					>
						<Row
							justify="end"
							style={{ position: 'absolute', top: 10, right: 16, gap: 12 }}
						>
							<Button
								onClick={() =>
									navigate(
										RoutePaths.STORY_DETAIL.replace(
											`:${PathHolders.STORY_ID}`,
											story.id,
										),
									)
								}
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: 6,
									background: '#e6f4ff',
									padding: '4px 10px',
									borderRadius: 6,
									cursor: 'pointer',
									transition: 'all 0.2s ease',
								}}
								onMouseEnter={(e) => {
									(e.currentTarget as HTMLElement).style.background = '#bae0ff';
								}}
								onMouseLeave={(e) => {
									(e.currentTarget as HTMLElement).style.background = '#e6f4ff';
								}}
							>
								<EyeFilled style={{ color: '#1677ff' }} />
								<Text style={{ color: '#1677ff', fontWeight: 500 }}>
									{t('seeDetails')}
								</Text>
							</Button>

							{story.status === StoryStatus.PENDING && (
								<Button
									onClick={() =>
										navigate(
											RoutePaths.UPDATE_UPLOADED_STORY.replace(
												`:${PathHolders.STORY_ID}`,
												String(story.id),
											),
										)
									}
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: 6,
										background: '#fff7e6',
										padding: '4px 10px',
										borderRadius: 6,
										cursor: 'pointer',
										transition: 'all 0.2s ease',
									}}
									onMouseEnter={(e) => {
										(e.currentTarget as HTMLElement).style.background =
											'#ffe7ba';
									}}
									onMouseLeave={(e) => {
										(e.currentTarget as HTMLElement).style.background =
											'#fff7e6';
									}}
								>
									<EditOutlined style={{ color: '#fa8c16' }} />
									<Text style={{ color: '#fa8c16', fontWeight: 500 }}>
										{t('update')}
									</Text>
								</Button>
							)}
						</Row>
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
											src={story.file?.url ?? '/unknow_image.jpg'}
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
												<Tag color="blue">{story.genre?.name}</Tag>
											</Descriptions.Item>
											<Descriptions.Item label="Ngôn ngữ">
												<Tag color="purple">{story.language}</Tag>
											</Descriptions.Item>
											<Descriptions.Item label="Trạng thái">
												{getStatusTag(story.status)}
											</Descriptions.Item>
											<Descriptions.Item label="Ngày đăng">
												<Text type="secondary" style={{ fontSize: 13 }}>
													{story?.uploadedDate
														? dayjs(story?.uploadedDate).format(
																'DD/MM/YYYY HH:mm:ss',
														  )
														: '-'}
												</Text>
											</Descriptions.Item>
											<Descriptions.Item label="Ngày phát hành">
												<Text type="secondary" style={{ fontSize: 13 }}>
													{story?.publishedDate
														? dayjs(story?.publishedDate).format(
																'DD/MM/YYYY HH:mm:ss',
														  )
														: '-'}
												</Text>
											</Descriptions.Item>
											<Descriptions.Item label="Cập nhật lần cuối">
												<Text type="secondary" style={{ fontSize: 13 }}>
													{story?.lastUpdatedDate
														? dayjs(story?.lastUpdatedDate).format(
																'DD/MM/YYYY HH:mm:ss',
														  )
														: '-'}
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
									<Title
										level={3}
										style={{ marginBottom: 12, color: '#146C94' }}
									>
										{story?.title || 'N/A'}
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
								{story.viewCount} {t('view')}
							</Col>
							<Col>
								<LikeOutlined style={{ marginRight: 4 }} />
								{story.favoriteCount} {t('favorite')}
							</Col>
							<Col>
								<MessageOutlined style={{ marginRight: 4 }} />
								{story.commentCount} {t('comment')}
							</Col>
						</Row>
					</Card>
				))}
			</Space>
		</Guard>
	);
};

export default ProfilePage;
