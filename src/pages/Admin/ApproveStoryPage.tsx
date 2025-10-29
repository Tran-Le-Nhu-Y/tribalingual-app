import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	UploadImage,
	TextEditor,
	LoadingScreen,
	Guard,
} from '../../components';
import Title from 'antd/es/typography/Title';
import {
	Form,
	Input,
	Button,
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
import {
	StoryLanguage,
	PathHolders,
	RoutePaths,
	StoryStatus,
} from '../../util';
import type { Story } from '../../@types/entities';
import {
	useDeleteFile,
	useGetGenres,
	useGetStoryById,
	usePublishStory,
	useUpdateStory,
	useUploadFile,
} from '../../service';
import type { UpdateStoryRequest } from '../../@types/requests';
import type { GetQuery } from '../../@types/queries';
import { useAuth0 } from '@auth0/auth0-react';

const ApproveStoryPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const { notification, modal } = App.useApp();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { user } = useAuth0();
	const storyId = useParams()[PathHolders.STORY_ID];
	const [story, setStory] = useState<Story | null>(null);
	const [originalStory, setOriginalStory] = useState<Story | null>(null);
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [fileloading, setFileloading] = useState(false);
	const [fileToDelete, setFileToDelete] = useState<string | null>(null);
	const [tempFileId, setTempFileId] = useState<string | null>(null);
	const [isPublishing, setIsPublishing] = useState(false);
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
		setStory(storyDetail.data);
		setOriginalStory(storyDetail.data);
		form.setFieldsValue(storyDetail.data);
		if (storyDetail.data.file) {
			setFileList([
				{
					uid: storyDetail.data.file.id,
					name: storyDetail.data.file.name || 'story_image',
					status: 'done',
					url: storyDetail.data.file.url,
				},
			]);
		}
	}, [
		form,
		notification,
		storyDetail.data,
		storyDetail.isError,
		storyDetail.isFetching,
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
	const [uploadFile] = useUploadFile();
	const [deleteFileTrigger] = useDeleteFile();

	const [updateStoryTrigger, updateStory] = useUpdateStory();
	const [publishStoryTrigger, publishStory] = usePublishStory();

	const handleSubmit = async (status: StoryStatus) => {
		setIsPublishing(status === StoryStatus.PUBLISHED);

		if (!story || !storyId || !user?.sub) return;

		try {
			const values = await form.validateFields();

			// update
			const payload: UpdateStoryRequest = {
				id: storyId!,
				genreId: values.genreId,
				...(story.fileId ? { fileId: story.fileId } : {}),
				userId: user?.sub || '',

				title: values.title,
				description: values.description,
				language: values.language,
				viewLink: values.viewLink,
				gameLink: values.gameLink,
				audioLink: values.audioLink,
				vietnameseContent: values.vietnameseContent,
				englishContent: values.englishContent,
				hmongContent: values.hmongContent,
				status: status,
			};
			await updateStoryTrigger(payload).unwrap();

			//publish
			if (status === StoryStatus.PUBLISHED) {
				await publishStoryTrigger({
					storyId: storyId!,
					adminId: user?.sub || '',
				}).unwrap();
			}

			if (fileToDelete) {
				await deleteFileTrigger(fileToDelete).unwrap();
				setFileToDelete(null);
			}

			setTempFileId(null);

			notification.success({
				message:
					status === StoryStatus.PUBLISHED
						? t('approveSuccess')
						: status === StoryStatus.REJECTED
						? t('rejectSuccess')
						: t('updateStorySuccess'),

				placement: 'topRight',
			});
			navigate(RoutePaths.ADMIN);
		} catch (error: unknown) {
			if (typeof error === 'object' && error && 'errorFields' in error) {
				return;
			}
			console.error('Approve error:', error);
			notification.error({
				message:
					status === StoryStatus.PUBLISHED
						? t('approveError')
						: status === StoryStatus.REJECTED
						? t('rejectError')
						: t('updateStoryFailed'),

				placement: 'topRight',
			});
		}
	};

	const handleCancel = () => {
		modal.confirm({
			title: t('confirmCancelUploadStoryTitle'),
			content: t('confirmCancelUploadStoryMessage'),
			okText: t('submit'),
			cancelText: t('cancel'),
			onOk: async () => {
				try {
					if (tempFileId) {
						await deleteFileTrigger(tempFileId).unwrap();
						setTempFileId(null);
					}

					if (originalStory) {
						setStory(originalStory);
						form.setFieldsValue({
							title: originalStory.title,
							description: originalStory.description,
							genreId: originalStory.genreId,
							language: originalStory.language,
							viewLink: originalStory.viewLink,
							gameLink: originalStory.gameLink,
							audioLink: originalStory.audioLink,
						});
						setFileList(
							originalStory.file
								? [
										{
											uid: originalStory.file.id,
											name: originalStory.file.name,
											status: 'done',
											url: originalStory.file.url,
										},
								  ]
								: [],
						);
					}
					setFileToDelete(null);

					navigate(RoutePaths.ADMIN);
				} catch (error) {
					console.error('Cancel cleanup failed:', error);
					notification.error({
						message: t('cancelFailed'),
						placement: 'topRight',
					});
				}
			},
		});
	};

	const translatedLanguages = story
		? Object.values(StoryLanguage).filter((lang) => lang !== story.language)
		: [];

	if (
		storyDetail.isFetching ||
		storyDetail.isLoading ||
		updateStory.isLoading ||
		publishStory.isLoading ||
		!story
	) {
		return <LoadingScreen />;
	}

	return (
		<Guard
			requiredPermissions={[
				'READ_STORY',
				'UPDATE_STORY',
				'PUBLISH_STORY',
				'CREATE_FILE',
				'DELETE_FILE',
			]}
		>
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

				{updateStory.isLoading ? (
					<Spin></Spin>
				) : (
					<Form
						form={form}
						layout="vertical"
						onValuesChange={(_, allValues) => {
							setStory((prev) => ({ ...prev, ...allValues }));
						}}
					>
						<Row style={{ marginBottom: 15 }}>
							<Title level={5} style={{ margin: 0 }}>
								{t('author')} : abc
							</Title>
						</Row>
						<Form.Item
							label={t('storyTitle')}
							name="title"
							rules={[{ required: true, message: t('storyTitleRequired') }]}
						>
							<Input placeholder={t('storyTitlePlaceholder')} />
						</Form.Item>

						<Form.Item label={t('storyDescription')} name="description">
							<TextArea
								rows={4}
								placeholder={t('storyDescriptionPlaceholder')}
							/>
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

											if (
												story.fileId &&
												story.fileId !== originalStory?.fileId
											) {
												setFileToDelete(story.fileId);
											}

											setTempFileId(uploadedFile.id);

											setStory((prev) =>
												prev ? { ...prev, fileId: uploadedFile.id } : prev,
											);
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
									onRemove={() => {
										if (story.fileId) {
											setFileToDelete(story.fileId);
											setStory((prev) => prev && { ...prev, fileId: '' });
											setFileList([]);
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
										setStory((prev) =>
											prev ? { ...prev, genreId: value } : prev,
										);
									}}
									options={genres.data?.content.map((g) => ({
										label: g.name,
										value: g.id,
									}))}
									value={story.genreId}
									style={{ width: 200 }}
								/>
							</Form.Item>
							<Form.Item label={t('language')}>
								<Select
									value={
										story.language === StoryLanguage.VIETNAMESE
											? t('vietnamese')
											: story.language === StoryLanguage.ENGLISH
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
								story.language === StoryLanguage.VIETNAMESE
									? 'vietnameseContent'
									: story.language === StoryLanguage.ENGLISH
									? 'englishContent'
									: 'hmongContent'
							}
						>
							<TextEditor />
						</Form.Item>
						{translatedLanguages.map((lang) => (
							<Card
								key={lang}
								style={{
									marginTop: 20,
									marginBottom: 20,
									background: '#fafafa',
									borderRadius: 6,
								}}
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
									<TextEditor />
								</Form.Item>
							</Card>
						))}
						<Form.Item
							label={t('viewLink')}
							name="viewLink"
							rules={[
								{ required: isPublishing, message: t('viewLinkRequired') },
							]}
						>
							<Input placeholder={t('viewLinkPlaceholder')} />
						</Form.Item>
						<Form.Item
							label={t('audioLink')}
							name="audioLink"
							rules={[
								{ required: isPublishing, message: t('audioLinkRequired') },
							]}
						>
							<Input placeholder={t('audioLinkPlaceholder')} />
						</Form.Item>
						<Form.Item
							label={t('gameLink')}
							name="gameLink"
							rules={[
								{ required: isPublishing, message: t('gameLinkRequired') },
							]}
						>
							<Input placeholder={t('gameLinkPlaceholder')} />
						</Form.Item>

						<Form.Item>
							<Space style={{ marginTop: 15 }}>
								<Button
									type="primary"
									disabled={fileloading}
									onClick={() => {
										setIsPublishing(true);
										handleSubmit(StoryStatus.PUBLISHED);
									}}
								>
									{t('approve')}
								</Button>
								<Button
									color="primary"
									variant="outlined"
									disabled={fileloading}
									onClick={() => {
										setIsPublishing(false);
										handleSubmit(StoryStatus.UPDATED);
									}}
								>
									{t('update')}
								</Button>
								<Button
									danger
									disabled={fileloading}
									onClick={() => {
										setIsPublishing(false);
										handleSubmit(StoryStatus.REJECTED);
									}}
								>
									{t('reject')}
								</Button>
								<Button disabled={fileloading} onClick={handleCancel}>
									{t('cancel')}
								</Button>
							</Space>
						</Form.Item>
					</Form>
				)}
			</Card>
		</Guard>
	);
};

export default ApproveStoryPage;
