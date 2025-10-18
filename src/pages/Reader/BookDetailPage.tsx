import {
	Button,
	Row,
	Col,
	Typography,
	Space,
	Descriptions,
	Image,
	Card,
	Form,
	Divider,
	App,
} from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { CommentList, Guard, LoadingScreen } from '../../components';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'react-router';
import { useGetAllComments, useGetStoryById } from '../../service';
import { Language, PathHolders, StoryStatus } from '../../util';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import type { GetCommentQuery } from '../../@types/queries';
import type { Comment } from '../../@types/entities';
import type { CommentResponse } from '../../@types/response';

const { Title, Paragraph } = Typography;
const paragraphStyle = {
	lineHeight: 1.8,
	textAlign: 'justify' as const,
	maxHeight: '7.2em', // 3 lines * line-height (1.8em)
	overflow: 'hidden',
};

const BookDetailPage = () => {
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();
	const storyId = useParams()[PathHolders.STORY_ID];
	const { user } = useAuth0();
	//Get story detail
	const storyDetail = useGetStoryById(storyId!, {
		skip: !storyId,
	});
	useEffect(() => {
		if (storyDetail.isFetching || !storyDetail.data) return;
		if (storyDetail.isError) {
			notification.error({
				message: t('dataLoadingError'),
				description: t('storiesLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
	}, [
		notification,
		storyDetail.data,
		storyDetail.isError,
		storyDetail.isFetching,
		t,
	]);

	//Get all comment of story
	const [commentsQuery, setCommentsQuery] = useState<GetCommentQuery>({
		offset: 0,
		limit: 5, //  5 item
		storyId: storyId!,
	});
	const comments = useGetAllComments(commentsQuery!, {
		skip: !commentsQuery,
	});
	const [allComments, setAllComments] = useState<CommentResponse[]>([]);
	useEffect(() => {
		if (comments.isError) {
			notification.error({
				message: t('dataLoadingError'),
				description: t('commentLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
		if (!comments.data?.content) return;
		if (comments.data?.content?.length) {
			setAllComments((prev) => [
				...prev,
				...comments.data!.content.map(
					(cmt) =>
						({
							...cmt,
							id: cmt.id,
						} as Comment),
				),
			]);
		}
	}, [comments.data, comments.isError, notification, t]);

	// const commentContent = useMemo(() => {
	// 	if (comments.isError) return [];
	// 	if (comments.data?.content)
	// 		return comments.data.content.map(
	// 			(cmt) =>
	// 				({
	// 					...cmt,
	// 					id: cmt.id,
	// 				} as Comment),
	// 		);
	// 	return [];
	// }, [comments.data, comments.isError]);

	// // Xử lý submit comment
	// const handleAddComment = (values: { content: string }) => {
	// 	const newComment = {
	// 		id: comments.length + 1,
	// 		author: 'Bạn đọc', // có thể lấy từ user login
	// 		avatar: 'https://i.pravatar.cc/150?img=5',
	// 		content: values.content,
	// 		datetime: new Date().toLocaleString(),
	// 	};
	// 	setComments([newComment, ...comments]);
	// };

	if (storyDetail.isFetching || storyDetail.isLoading) {
		return <LoadingScreen />;
	}
	return (
		<Guard requiredPermissions={['READ_STORY']}>
			<Card style={{ padding: 16, borderRadius: 8 }}>
				<Row gutter={[24, 24]} align="top">
					<Col xs={24} sm={24} md={24} lg={10} xl={8} xxl={6}>
						<Space style={{ textAlign: 'center' }}>
							<Image
								src={storyDetail.data?.file?.url}
								style={{
									width: '100%',
									maxWidth: 260,
									aspectRatio: '3/4',
									objectFit: 'cover',
									borderRadius: 12,
									marginBottom: 16,
									boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
								}}
							/>
						</Space>

						<Descriptions column={1} colon={false} size="middle" bordered>
							<Descriptions.Item label={t('author')}>
								{user?.name}
							</Descriptions.Item>
							<Descriptions.Item label={t('genre')}>
								{storyDetail.data?.genre?.name || 'N/A'}
							</Descriptions.Item>
							<Descriptions.Item label={t('language')}>
								{storyDetail.data?.language === Language.VIETNAMESE
									? t('vietnamese')
									: storyDetail.data?.language === Language.HMONG
									? t('hmong')
									: t('english')}
							</Descriptions.Item>
							<Descriptions.Item label={t('status')}>
								{storyDetail.data?.status === StoryStatus.PENDING
									? t('pending')
									: storyDetail.data?.status === StoryStatus.PUBLISHED
									? t('published')
									: storyDetail.data?.status === StoryStatus.REJECTED
									? t('rejected')
									: storyDetail.data?.status === StoryStatus.HIDDEN
									? t('hidden')
									: t('updated')}
							</Descriptions.Item>
							<Descriptions.Item label={t('uploadedDate')}>
								{storyDetail.data?.uploadedDate
									? dayjs(storyDetail.data?.uploadedDate).format(
											'DD/MM/YYYY HH:mm:ss',
									  )
									: '-'}
							</Descriptions.Item>
							<Descriptions.Item label={t('publishedDate')}>
								{storyDetail.data?.publishedDate
									? dayjs(storyDetail.data?.publishedDate).format(
											'DD/MM/YYYY HH:mm:ss',
									  )
									: '-'}
							</Descriptions.Item>
							<Descriptions.Item label={t('lastUpdatedDate')}>
								{storyDetail.data?.lastUpdatedDate
									? dayjs(storyDetail.data?.lastUpdatedDate).format(
											'DD/MM/YYYY HH:mm:ss',
									  )
									: '-'}
							</Descriptions.Item>
							<Descriptions.Item label={t('view')}>
								{storyDetail.data?.viewCount || '0'}
							</Descriptions.Item>
							<Descriptions.Item label={t('favorite')}>
								{storyDetail.data?.favoriteCount || '0'}
							</Descriptions.Item>
						</Descriptions>
					</Col>

					{/* Nội dung sách */}
					<Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={18}>
						<div style={{ paddingRight: 12 }}>
							<Title level={2} style={{ marginBottom: 24, color: '#146C94' }}>
								{storyDetail.data?.title || 'N/A'}
							</Title>
							{/* <Title level={4} style={{ margin: '4px 0' }}>
							CỔ TÍCH NGƯỜI H’MÔNG
						</Title>
						<Title
							level={4}
							style={{ marginTop: 0, marginBottom: 24, color: '#146C94' }}
						>
							ZAJ DAB NEEG HMOOB
						</Title> */}

							<Paragraph style={paragraphStyle}>
								{storyDetail.data?.description || 'N/A'}
							</Paragraph>

							<Space size="middle" style={{ marginTop: 32, flexWrap: 'wrap' }}>
								<Button style={{ color: 'red' }} icon={<HeartOutlined />}>
									{t('favorite')}
								</Button>
								<Button
									type="primary"
									icon={<EyeOutlined />}
									style={{ borderRadius: 6 }}
								>
									{t('see')}
								</Button>
							</Space>
						</div>
					</Col>
				</Row>
				{/* Comment list */}
				<Guard requiredPermissions={['READ_USER']}>
					<Space direction="vertical" style={{ width: '100%', marginTop: 32 }}>
						<Form layout="vertical" style={{ marginTop: 16 }}>
							<Form.Item
								name="content"
								rules={[
									{ required: false, message: 'Vui lòng nhập bình luận!' },
								]}
							>
								<TextArea
									rows={3}
									placeholder={t('enterComment')}
									maxLength={500}
								/>
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									{t('sendComment')}
								</Button>
							</Form.Item>
						</Form>
						<Divider orientation="left" style={{ borderColor: '#d9d9d9' }}>
							<Title level={5} style={{ margin: 0, color: 'grey' }}>
								{storyDetail.data?.commentCount ?? 0} {t('comment')}
							</Title>
						</Divider>
						<CommentList
							comments={allComments ?? []}
							onLoadMore={() => {
								setCommentsQuery({
									offset:
										(commentsQuery?.offset ?? 0) + (commentsQuery?.limit ?? 5),
									limit: commentsQuery.limit ?? 5,
									storyId: storyId!,
								});
							}}
							hasMore={
								comments.data
									? allComments.length < comments.data.total_elements
									: false
							}
							loading={comments.isFetching || comments.isLoading}
						/>
					</Space>
				</Guard>
			</Card>
		</Guard>
	);
};

export default BookDetailPage;
