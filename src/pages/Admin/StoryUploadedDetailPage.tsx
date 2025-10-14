import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadImage, TextEditor, LoadingScreen } from '../../components';
import Title from 'antd/es/typography/Title';
import {
	Form,
	Input,
	Button,
	Space,
	Select,
	Card,
	App,
	Spin,
	type UploadFile,
	Descriptions,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router';
import { Language, PathHolders, RoutePaths } from '../../util';
import { useGetFileById, useGetGenres, useGetStoryById } from '../../service';
import type { GetQuery } from '../../@types/queries';
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
		setFileId(storyDetail.data.fileId ?? '');
		form.setFieldsValue(storyDetail.data);
		if (storyDetail.isError) {
			notification.error({
				message: t('dataLoadingError'),
				description: t('storiesLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
	}, [
		storyDetail.data,
		storyDetail.isFetching,
		storyDetail.isError,
		notification,
		form,
		t,
	]);
	//Get all genre
	const [genresQuery] = useState<GetQuery>({
		offset: 0,
		limit: 20,
	});
	const genres = useGetGenres(genresQuery!, {
		skip: !genresQuery,
	});
	useEffect(() => {
		if (genres.isError) {
			notification.error({
				message: t('dataLoadingError'),
				description: t('genreLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
	}, [genres.data, genres.isError, notification, t]);
	//file
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [fileId, setFileId] = useState<string>('');
	const [fileloading] = useState(false);

	const file = useGetFileById(fileId, { skip: !fileId });
	useEffect(() => {
		if (!fileId) {
			setFileList([]);
			return;
		}
		if (file.data) {
			setFileList([
				{
					uid: file.data.id,
					name: file.data.name,
					status: 'done',
					url: file.data.url,
				},
			]);
		}

		if (file.isError) {
			notification.error({
				message: t('dataLoadingError'),
				placement: 'topRight',
			});
		}
	}, [file.data, file.isError, fileId, notification, t]);

	const translatedLanguages = Object.values(Language).filter(
		(lang) => lang !== storyDetail.data?.language,
	);

	if (storyDetail.isFetching || storyDetail.isLoading) {
		return <LoadingScreen />;
	}
	return (
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
				{t('approveStory')}
			</Title>

			<Form form={form} layout="vertical" initialValues={storyDetail.data}>
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
					<Descriptions.Item label={t('status')}>
						{storyDetail.data?.status}
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
					<Input placeholder={t('storyTitlePlaceholder')} />
				</Form.Item>

				<Form.Item label={t('storyDescription')} name="description">
					<TextArea rows={4} placeholder={t('storyDescriptionPlaceholder')} />
				</Form.Item>

				<Form.Item label={t('uploadImage')}>
					<Space
						style={{
							position: 'relative',
							display: 'block',
							width: 'fit-content',
						}}
					>
						<UploadImage maxCount={1} fileList={fileList} />
						{fileloading && (
							<Space
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									background: 'rgba(255, 255, 255, 0.6)',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									zIndex: 10,
								}}
							>
								<Spin />
							</Space>
						)}
					</Space>
				</Form.Item>
				<Space
					style={{
						display: 'flex',
						marginBottom: 30,
						alignItems: 'center',
					}}
				>
					<Form.Item
						label={t('genre')}
						name="genreId"
						rules={[{ message: t('storyGenreRequired') }]}
					>
						<Select
							placeholder={t('chooseGenre')}
							options={genres.data?.content.map((g) => ({
								label: g.name,
								value: g.id,
							}))}
							value={storyDetail.data?.genreId}
							style={{ width: 200 }}
							disabled
						/>
					</Form.Item>
					<Form.Item label={t('language')}>
						<Select
							value={
								storyDetail.data?.language === Language.VIETNAMESE
									? t('vietnamese')
									: storyDetail.data?.language === Language.ENGLISH
									? t('english')
									: t('hmong')
							}
							style={{ width: 200 }}
							disabled
						/>
					</Form.Item>
				</Space>
				<Form.Item
					label={t('storyContent')}
					name={
						storyDetail.data?.language === Language.VIETNAMESE
							? 'vietnameseContent'
							: storyDetail.data?.language === Language.ENGLISH
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
								lang === Language.ENGLISH
									? 'englishContent'
									: lang === Language.HMONG
									? 'hmongContent'
									: 'vietnameseContent'
							}
						>
							<TextEditor readOnly={true} />
						</Form.Item>
					</Card>
				))}

				<Form.Item>
					<Space style={{ marginTop: 15 }}>
						<Button onClick={() => navigate(RoutePaths.ADMIN)}>
							{t('return')}
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default StoryUploadedDetailPage;
