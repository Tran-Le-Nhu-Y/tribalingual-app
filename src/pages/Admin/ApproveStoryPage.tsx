import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadImage, TextEditor } from '../../components';
import Title from 'antd/es/typography/Title';
import {
	Form,
	Input,
	Button,
	message,
	Space,
	Select,
	Card,
	App,
	Row,
	Spin,
	type UploadFile,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router';
import { Language, PathHolders, StoryStatus } from '../../util';
import type { Story } from '../../@types/entities';
import {
	useDeleteFile,
	useGetFileById,
	useGetGenres,
	useGetStoryById,
	useUploadFile,
} from '../../service';

const ApproveStoryPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const storyId = useParams()[PathHolders.STORY_ID];
	const [story, setStory] = useState<Story>({
		id: '',
		authorId: '',
		genreId: '',
		adminId: '',
		fileId: '',
		title: '',
		description: '',
		language: '',
		hmongContent: '',
		englishContent: '',
		vietnameseContent: '',
		status: StoryStatus.PENDING,
		viewCount: 0,
		commentCount: 0,
		favoriteCount: 0,
	});

	//Get story detail
	const storyDetail = useGetStoryById(storyId!, {
		skip: !storyId,
	});
	useEffect(() => {
		if (storyDetail.data) {
			setStory((prev) => ({
				...prev,
				...storyDetail.data,
			}));
			form.setFieldsValue(storyDetail.data);
		}
		if (storyDetail.isError) {
			notification.error({
				message: t('dataLoadingError'),
				description: t('storiesLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
	}, [form, notification, storyDetail.data, storyDetail.isError, t]);

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
	const [fileloading, setFileloading] = useState(false);
	const [uploadFile] = useUploadFile();
	const [deleteFileTrigger] = useDeleteFile();
	const file = useGetFileById(story.fileId!, { skip: !story.fileId });
	useEffect(() => {
		if (file.data) {
			setFileList([
				{
					uid: file.data.id,
					name: file.data.name,
					status: 'done',
					url: file.data.url,
				},
			]);
		} else if (!story.fileId) {
			setFileList([]);
		}
		if (file.isError) {
			notification.error({
				message: t('dataLoadingError'),
				placement: 'topRight',
			});
		}
	}, [file.data, file.isError, notification, story.fileId, t]);

	// approve story

	const onFinish = () => {
		message.success('Câu chuyện đã được phê duyệt!');
	};

	const translatedLanguages = Object.values(Language).filter(
		(lang) => lang !== story.language,
	);

	if (storyDetail.isLoading) {
		return <Spin tip={t('dataLoading')} size="large" fullscreen />;
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

			<Form form={form} layout="vertical" onFinish={onFinish}>
				<Row style={{ marginBottom: 15 }}>
					<Title level={5} style={{ margin: 0 }}>
						{t('author')} : abc
					</Title>
				</Row>
				<Form.Item
					label={t('storyTitle')}
					name="title"
					rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
				>
					<Input placeholder="Nhập tiêu đề..." />
				</Form.Item>

				<Form.Item label={t('storyDescription')} name="description">
					<TextArea rows={4} placeholder="Nhập mô tả..." />
				</Form.Item>

				<Form.Item label={t('uploadImage')}>
					<Space
						style={{
							position: 'relative',
							display: 'block',
							width: 'fit-content',
						}}
					>
						<UploadImage
							maxCount={1}
							fileList={fileList}
							onChange={async (files) => {
								if (!files || files.length === 0) {
									setFileList([]);
									return;
								}
								const file = files[0].originFileObj;
								if (!file) return;
								setFileloading(true);
								try {
									const uploadedFile = await uploadFile({ file }).unwrap();
									setStory((prev) => ({ ...prev, fileId: uploadedFile.id }));
									setFileList(files);
								} catch (error) {
									console.error('Upload file failed:', error);
									notification.error({
										message: t('uploadFileFailed'),
										placement: 'topRight',
									});
								} finally {
									setFileloading(false);
								}
							}}
							onRemove={async () => {
								if (!story.fileId) return;
								setFileloading(true);
								try {
									await deleteFileTrigger(story.fileId).unwrap();
									setStory((prev) => ({ ...prev, fileId: '' }));
									setFileList([]);
								} catch (error) {
									console.error('Delete file failed:', error);
									notification.error({
										message: t('deleteFileFailed'),
										placement: 'topRight',
									});
								} finally {
									setFileloading(false);
								}
							}}
						/>
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
						rules={[{ required: true, message: t('storyGenreRequired') }]}
					>
						<Select
							placeholder={t('chooseGenre')}
							onChange={(value) => {
								setStory((prev) => ({
									...prev,
									genreId: value,
								}));
							}}
							options={genres.data?.content.map((g) => ({
								label: g.name,
								value: g.id,
							}))}
							value={story.genreId}
							style={{ width: 200 }}
						/>
					</Form.Item>
					<Form.Item
						label={t('language')}
						name="language"
						rules={[{ required: true, message: t('storyLanguageRequired') }]}
					>
						<Select
							placeholder={t('chooseLanguage')}
							value={story.language}
							onChange={(value) => {
								setStory((prev) => ({
									...prev,
									language: value,
								}));
							}}
							options={[
								{ label: t('vietnamese'), value: Language.VIETNAMESE },
								{ label: t('english'), value: Language.ENGLISH },
								{ label: t('hmong'), value: Language.HMONG },
							]}
							style={{ width: 200 }}
						/>
					</Form.Item>
				</Space>
				<Form.Item
					label={t('storyContent')}
					name={
						story.language === Language.VIETNAMESE
							? 'vietnameseContent'
							: story.language === Language.ENGLISH
							? 'englishContent'
							: 'hmongContent'
					}
				>
					<TextEditor />
				</Form.Item>
				{translatedLanguages.map((lang) => (
					<Card
						key={lang}
						style={{ marginTop: 20, background: '#fafafa', borderRadius: 6 }}
						size="small"
						title={`Bản dịch sang ${lang}`}
					>
						<Form.Item
							label={`Tiêu đề (${lang})`}
							name={['translations', lang, 'title']}
							rules={[
								{ required: true, message: `Vui lòng nhập tiêu đề ${lang}` },
							]}
						>
							<Input placeholder={`Nhập tiêu đề bằng ${lang}...`} />
						</Form.Item>

						<Form.Item
							label={`Nội dung (${lang})`}
							name={['translations', lang, 'content']}
							rules={[
								{ required: true, message: `Vui lòng nhập nội dung ${lang}` },
							]}
						>
							<TextEditor />
						</Form.Item>
					</Card>
				))}

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							{t('approve')}
						</Button>
						<Button danger>{t('reject')}</Button>
						<Button type="default" onClick={() => navigate(-1)}>
							{t('return')}
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default ApproveStoryPage;
