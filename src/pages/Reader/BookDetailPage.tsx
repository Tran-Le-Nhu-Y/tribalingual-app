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
import {
	EyeOutlined,
	HeartFilled,
	HeartOutlined,
	PlayCircleOutlined,
} from '@ant-design/icons';
import { CommentList, Guard, LoadingScreen } from '../../components';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'react-router';
import {
	useCreateComment,
	useCreateFavorite,
	useCreateView,
	useDeleteFavorite,
	useGetAllComments,
	useGetStoryById,
	useIsFavorited,
} from '../../service';
import { Language, PathHolders, StoryStatus } from '../../util';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';
import type { GetCommentQuery } from '../../@types/queries';
import type { CreateCommentRequest } from '../../@types/requests';
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
	const [form] = Form.useForm();
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
		if (commentsQuery.offset === 0) {
			setAllComments(comments.data.content);
		} else {
			setAllComments((prev) => [
				...prev,
				...comments.data!.content.filter(
					(newCmt) => !prev.some((oldCmt) => oldCmt.id === newCmt.id),
				),
			]);
		}
	}, [comments.data, comments.isError, commentsQuery.offset, notification, t]);

	// comment story
	const [createCommentTrigger, { isLoading: isCommentCreating }] =
		useCreateComment();
	const handleCreateComment = async () => {
		try {
			if (!user?.sub) {
				notification.warning({
					message: t('youMustBeLoggedInToComment'),
					placement: 'topRight',
				});
				return;
			}
			const content = form.getFieldValue('content')?.trim();
			if (!content) {
				notification.warning({
					message: t('pleaseEnterCommentBeforeSubmit'),
					placement: 'topRight',
				});
				return;
			}
			const payload: CreateCommentRequest = {
				storyId: storyId!,
				userId: user.sub,
				content: content,
			};
			await createCommentTrigger(payload).unwrap();
			setCommentsQuery({ storyId: storyId!, offset: 0, limit: 5 });
			await comments.refetch();
			await storyDetail.refetch();
			notification.success({ message: t('addCommentSuccess') });
			form.resetFields();
		} catch (error) {
			notification.error({
				message: t('addCommentFailed'),
			});
			console.log('Error: ', error);
		}
	};

	// favorite and remove favorite story
	const checkFavorited = useIsFavorited(
		{ storyId: storyId!, userId: user?.sub || '' },
		{ skip: !storyId || !user?.sub },
	);

	const [isFavorited, setIsFavorited] = useState<boolean>(false);

	useEffect(() => {
		if (checkFavorited.isSuccess && typeof checkFavorited.data === 'boolean') {
			setIsFavorited(checkFavorited.data);
		}
	}, [checkFavorited.data, checkFavorited.isSuccess]);

	const [createFavoriteTrigger, { isLoading: isFavoriteCreating }] =
		useCreateFavorite();
	const [deleteFavoriteTrigger, { isLoading: isFavoriteDeleting }] =
		useDeleteFavorite();
	const handleToggleFavorite = async () => {
		if (!storyId) return;
		if (!user?.sub) {
			notification.warning({
				message: t('youMustBeLoggedInToFavorite'),
				placement: 'topRight',
			});
			return;
		}
		const currentlyFav = isFavorited; // read current
		setIsFavorited(!currentlyFav);

		try {
			if (currentlyFav) {
				await deleteFavoriteTrigger({
					storyId: storyId!,
					userId: user.sub,
				}).unwrap();
				notification.info({ message: t('removeFavoriteSuccess') });
			} else {
				await createFavoriteTrigger({
					storyId: storyId!,
					userId: user.sub,
				}).unwrap();
				notification.success({ message: t('addFavoriteSuccess') });
			}
			await storyDetail.refetch();
			await checkFavorited.refetch();
		} catch (error) {
			notification.error({
				message: t('favoriteActionFailed'),
			});
			console.error(error);
			setIsFavorited(currentlyFav);
		}
	};

	//view
	const [createViewTrigger, { isLoading: isViewCreating }] = useCreateView();
	const handleCreateView = async () => {
		if (!storyId) return;
		if (!user?.sub) {
			notification.warning({
				message: t('youMustBeLoggedInToView'),
				placement: 'topRight',
			});
			return;
		}
		try {
			await createViewTrigger({
				storyId: storyId!,
				userId: user.sub,
			}).unwrap();

			const viewLink = storyDetail.data?.viewLink;
			if (viewLink) {
				if (viewLink.startsWith('http')) {
					window.open(viewLink, '_blank');
				} else {
					notification.warning({
						message: t('viewLinkNotFound'),
						placement: 'topRight',
					});
					return;
				}
			} else {
				notification.info({ message: t('viewLinkNotFound') });
			}
		} catch (error) {
			console.error('Create view error: ', error);
			notification.error({
				message: t('viewActionFailed'),
			});
		}
	};

	//game
	const handlePlayGame = () => {
		const gameLink = storyDetail.data?.gameLink;
		if (gameLink) {
			if (gameLink.startsWith('http')) {
				window.open(gameLink, '_blank');
			} else {
				notification.warning({
					message: t('gameLinkNotFound'),
					placement: 'topRight',
				});
				return;
			}
		} else {
			notification.info({ message: t('gameLinkNotFound') });
		}
	};

	if (storyDetail.isLoading) {
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

					{/* Story Content */}
					<Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={18}>
						<div style={{ paddingRight: 12 }}>
							<Title level={2} style={{ marginBottom: 24, color: '#146C94' }}>
								{storyDetail.data?.title || 'N/A'}
							</Title>

							<Paragraph style={paragraphStyle}>
								{storyDetail.data?.description || 'N/A'}
							</Paragraph>

							<Space size="middle" style={{ marginTop: 32, flexWrap: 'wrap' }}>
								<Button
									type={isFavorited ? 'primary' : 'default'}
									icon={isFavorited ? <HeartFilled /> : <HeartOutlined />}
									onClick={handleToggleFavorite}
									loading={
										isFavoriteCreating ||
										isFavoriteDeleting ||
										checkFavorited.isLoading
									}
									style={{
										borderRadius: 20,
										border: '1px solid red',
										color: isFavorited ? '#fff' : 'red',
										background: isFavorited
											? 'linear-gradient(135deg, #ff4d4f, #ff7875)'
											: 'transparent',
										boxShadow: isFavorited
											? '0 4px 10px rgba(255,77,79,0.4)'
											: 'none',
										transition: 'all 0.3s ease',
									}}
									onMouseEnter={(e) => {
										const target = e.currentTarget;
										if (!isFavorited) {
											target.style.backgroundColor = 'rgba(255,0,0,0.1)';
										}
									}}
									onMouseLeave={(e) => {
										const target = e.currentTarget;
										if (!isFavorited) {
											target.style.backgroundColor = 'transparent';
										}
									}}
								>
									{isFavorited ? t('unfavorite') : t('favorite')}
								</Button>
								<Button
									type="primary"
									icon={<EyeOutlined />}
									style={{ borderRadius: 6 }}
									loading={isViewCreating}
									onClick={handleCreateView}
								>
									{t('see')}
								</Button>
								<Button
									type="primary"
									icon={<PlayCircleOutlined />}
									style={{ borderRadius: 6 }}
									onClick={handlePlayGame}
								>
									{t('game')}
								</Button>
							</Space>
						</div>
					</Col>
				</Row>
				{/* Comment list */}
				<Guard requiredPermissions={['READ_USER', 'CREATE_COMMENT']}>
					<Space direction="vertical" style={{ width: '100%', marginTop: 32 }}>
						<Form
							layout="vertical"
							style={{ marginTop: 16 }}
							form={form}
							onFinish={handleCreateComment}
						>
							<Form.Item
								name="content"
								rules={[
									{ required: true, message: t('commentContentRequired') },
								]}
							>
								<TextArea
									rows={3}
									placeholder={t('enterComment')}
									maxLength={500}
									showCount
								/>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									loading={isCommentCreating}
								>
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
								setCommentsQuery((prev) => ({
									...prev,
									offset: (prev?.offset ?? 0) + (prev?.limit ?? 5),
								}));
							}}
							hasMore={
								comments.data
									? allComments.length < comments.data.total_elements
									: false
							}
							loading={
								comments.isFetching || comments.isLoading || isCommentCreating
							}
						/>
					</Space>
				</Guard>
			</Card>
		</Guard>
	);
};

export default BookDetailPage;
