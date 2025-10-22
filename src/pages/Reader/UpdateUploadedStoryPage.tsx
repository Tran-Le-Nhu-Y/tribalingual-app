import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	UploadImage,
	TextEditor,
	Guard,
	LoadingScreen,
} from '../../components';
import Title from 'antd/es/typography/Title';
import {
	Form,
	Input,
	Button,
	Space,
	Select,
	App,
	Spin,
	Card,
	type UploadFile,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
	useDeleteFile,
	useGetGenres,
	useGetStoryById,
	useUpdateStory,
	useUploadFile,
} from '../../service';
import type { Story } from '../../@types/entities';
import { Language, PathHolders, StoryStatus } from '../../util';
import type { UpdateStoryRequest } from '../../@types/requests';
import { useAuth0 } from '@auth0/auth0-react';
import type { GetQuery } from '../../@types/queries';
import { useNavigate, useParams } from 'react-router';

const UpdateUploadedStoryPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const navigate = useNavigate();
	const { notification, modal } = App.useApp();
	const { user } = useAuth0();
	const storyId = useParams()[PathHolders.STORY_ID];
	const [form] = Form.useForm();

	const [story, setStory] = useState<Story | null>(null);
	const [originalStory, setOriginalStory] = useState<Story | null>(null);
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [fileloading, setFileloading] = useState(false);
	const [fileToDelete, setFileToDelete] = useState<string | null>(null);
	const [tempFileId, setTempFileId] = useState<string | null>(null);

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

	const [uploadFile] = useUploadFile();
	const [deleteFileTrigger] = useDeleteFile();

	// update uploaded story
	const [updateStoryTrigger, updateStory] = useUpdateStory();
	const hanldeSubmit = async () => {
		if (!story || !storyId || !user?.sub) return;
		try {
			const payload: UpdateStoryRequest = {
				id: storyId,
				userId: user?.sub,
				genreId: story.genreId,
				...(story.fileId ? { fileId: story.fileId } : {}),
				language: story.language,
				title: story.title,
				description: story.description,
				status: StoryStatus.PENDING,
				englishContent: story.englishContent,
				hmongContent: story.hmongContent,
				vietnameseContent: story.vietnameseContent,
			};
			await updateStoryTrigger(payload).unwrap();

			if (fileToDelete) {
				await deleteFileTrigger(fileToDelete).unwrap();
				setFileToDelete(null);
			}

			setTempFileId(null);
			notification.success({
				message: t('updateStorySuccess'),
				placement: 'topRight',
			});
			navigate(-1);
		} catch (error) {
			notification.error({
				message: t('updateStoryFailed'),
				placement: 'topRight',
			});
			console.log('Update story error: ', error);
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

	if (storyDetail.isLoading || !story) return <LoadingScreen />;

	return (
		<Guard requiredPermissions={['UPDATE_STORY']}>
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
					{t('updateYourStory')}
				</Title>

				{updateStory.isLoading ? (
					<Spin></Spin>
				) : (
					<Form form={form} layout="vertical" onFinish={hanldeSubmit}>
						<Form.Item
							label={t('storyTitle')}
							name="title"
							rules={[{ required: true, message: t('storyTitleRequired') }]}
						>
							<Input
								value={story.title}
								placeholder={t('storyTitlePlaceholder')}
								onChange={(e) =>
									setStory((prev) => prev && { ...prev, title: e.target.value })
								}
							/>
						</Form.Item>

						<Form.Item label={t('storyDescription')} name="description">
							<TextArea
								value={story.description}
								rows={4}
								placeholder={t('storyDescriptionPlaceholder')}
								onChange={(e) =>
									setStory(
										(prev) => prev && { ...prev, description: e.target.value },
									)
								}
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
										story.language === Language.VIETNAMESE
											? t('vietnamese')
											: story.language === Language.ENGLISH
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
								story.language === Language.VIETNAMESE
									? 'vietnameseContent'
									: story.language === Language.ENGLISH
									? 'englishContent'
									: 'hmongContent'
							}
							required
							rules={[
								{
									validator: () => {
										const currentContent =
											story.language === Language.VIETNAMESE
												? story.vietnameseContent
												: story.language === Language.ENGLISH
												? story.englishContent
												: story.hmongContent;

										return currentContent && currentContent !== '<p></p>'
											? Promise.resolve()
											: Promise.reject(new Error(t('storyContentRequired')));
									},
								},
							]}
						>
							<TextEditor
								key={`${story.id}-${story.language}`}
								value={
									story.language === Language.VIETNAMESE
										? story.vietnameseContent ?? ''
										: story.language === Language.ENGLISH
										? story.englishContent ?? ''
										: story.hmongContent ?? ''
								}
								onChange={(value) => {
									setStory((prev) => {
										if (!prev) return prev;
										return {
											...prev,
											vietnameseContent:
												prev.language === Language.VIETNAMESE
													? value
													: prev.vietnameseContent,
											englishContent:
												prev.language === Language.ENGLISH
													? value
													: prev.englishContent,
											hmongContent:
												prev.language === Language.HMONG
													? value
													: prev.hmongContent,
										};
									});
								}}
							/>
						</Form.Item>

						<Form.Item>
							<Space>
								<Button
									type="default"
									disabled={updateStory.isLoading || fileloading}
									onClick={handleCancel}
								>
									{t('cancel')}
								</Button>
								<Button
									type="primary"
									htmlType="submit"
									loading={updateStory.isLoading || fileloading}
								>
									{t('submit')}
								</Button>
							</Space>
						</Form.Item>
					</Form>
				)}
			</Card>
		</Guard>
	);
};

export default UpdateUploadedStoryPage;
