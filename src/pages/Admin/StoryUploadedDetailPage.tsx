import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextEditor, LoadingScreen, Guard } from '../../components';
import Title from 'antd/es/typography/Title';
import {
	Form,
	Input,
	Button,
	Space,
	Card,
	App,
	Descriptions,
	Image,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router';
import {
	StoryLanguage,
	PathHolders,
	RoutePaths,
	StoryStatus,
} from '../../util';
import { useGetStoryById } from '../../service';
import { useAuth0 } from '@auth0/auth0-react';
import dayjs from 'dayjs';

const StoryUploadedDetailPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { user } = useAuth0();
	const storyId = useParams()[PathHolders.STORY_ID];

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

	const translatedLanguages = Object.values(StoryLanguage).filter(
		(lang) => lang !== storyDetail.data?.language,
	);

	if (storyDetail.isFetching || storyDetail.isLoading) {
		return <LoadingScreen />;
	}
	return (
		<Guard requiredPermissions={['READ_STORY']}>
			<Card
				style={{
					maxWidth: 920,
					margin: '0 auto',
					padding: '10px',
					background: '#fff',
					borderRadius: 8,
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				}}
			>
				<Title
					style={{
						margin: 0,
						paddingTop: 4,
						marginBottom: 16,
						color: '#03506F',
						fontSize: 28,
						fontWeight: 700,
						letterSpacing: 1,
					}}
					level={3}
				>
					{t('storyDetail')}
				</Title>

				<Form form={form} layout="vertical" initialValues={storyDetail.data}>
					<Form.Item>
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
					</Form.Item>
					<Descriptions
						column={1}
						colon={false}
						size="middle"
						bordered
						style={{ marginBottom: 20 }}
					>
						<Descriptions.Item label={t('author')}>
							{user?.name}
						</Descriptions.Item>
						<Descriptions.Item label={t('genre')}>
							{storyDetail.data?.genre?.name || 'N/A'}
						</Descriptions.Item>
						<Descriptions.Item label={t('language')}>
							{storyDetail.data?.language === StoryLanguage.VIETNAMESE
								? t('vietnamese')
								: storyDetail.data?.language === StoryLanguage.HMONG
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
					</Descriptions>
					<Form.Item
						label={t('storyTitle')}
						name="title"
						rules={[{ message: t('storyTitleRequired') }]}
					>
						<Input placeholder={t('storyTitlePlaceholder')} readOnly />
					</Form.Item>

					<Form.Item label={t('storyDescription')} name="description">
						<TextArea
							rows={5}
							placeholder={t('storyDescriptionPlaceholder')}
							readOnly
						/>
					</Form.Item>

					<Form.Item
						label={t('storyContent')}
						name={
							storyDetail.data?.language === StoryLanguage.VIETNAMESE
								? 'vietnameseContent'
								: storyDetail.data?.language === StoryLanguage.ENGLISH
								? 'englishContent'
								: 'hmongContent'
						}
					>
						<TextEditor readOnly={true} />
					</Form.Item>
					{translatedLanguages.map((lang) => (
						<Card
							key={lang}
							style={{ marginTop: 20, background: '#fafafa', borderRadius: 6 }}
							size="small"
							title={`${t('translateTo')} ${lang}`}
						>
							{/* <Form.Item
							label={`${t('storyTitle')}(${lang})`}
							name={['translations', lang, 'title']}
							rules={[
								{
									required: true,
									message: t('storyTitleRequired'),
								},
							]}
						>
							<Input placeholder={t('storyTitlePlaceholder')} />
						</Form.Item> */}

							<Form.Item
								label={`${t('storyContent')} (${lang})`}
								name={
									lang === StoryLanguage.ENGLISH
										? 'englishContent'
										: lang === StoryLanguage.HMONG
										? 'hmongContent'
										: 'vietnameseContent'
								}
							>
								<TextEditor readOnly={true} />
							</Form.Item>
						</Card>
					))}

					<Form.Item label={t('viewLink')} name="viewLink">
						<Input placeholder={t('viewLinkPlaceholder')} readOnly />
					</Form.Item>
					<Form.Item label={t('gameLink')} name="gameLink">
						<Input placeholder={t('gameLinkPlaceholder')} readOnly />
					</Form.Item>

					<Form.Item>
						<Space style={{ marginTop: 15 }}>
							<Button onClick={() => navigate(RoutePaths.ADMIN)}>
								{t('return')}
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Card>
		</Guard>
	);
};

export default StoryUploadedDetailPage;
