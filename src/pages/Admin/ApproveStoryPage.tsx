import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadImage, TextEditor } from '../../components';
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
import { Language, PathHolders, StoryStatus } from '../../util';
import type { Story } from '../../@types/entities';
import {
	useDeleteFile,
	useGetFileById,
	useGetGenres,
	useGetStoryById,
	usePublishStory,
	useUpdateStory,
	useUploadFile,
} from '../../service';
import type { UpdateStoryRequest } from '../../@types/requests';
import type { GetQuery } from '../../@types/queries';

const originStory: Story = {
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
};

const ApproveStoryPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const { notification, modal } = App.useApp();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const storyId = useParams()[PathHolders.STORY_ID];
	useEffect(() => {
		setStory(originStory);
		form.resetFields();
	}, [storyId, form]);
	const [story, setStory] = useState<Story>(originStory);
	//Get story detail
	const storyDetail = useGetStoryById(storyId!, {
		skip: !storyId,
	});
	useEffect(() => {
		if (storyDetail.isFetching || !storyDetail.data) return;
		setStory(storyDetail.data);
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
	const [fileloading, setFileloading] = useState(false);
	const [uploadFile] = useUploadFile();
	const [deleteFileTrigger] = useDeleteFile();
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

	const [updateStoryTrigger, updateStory] = useUpdateStory();
	const [publishStoryTrigger, publishStory] = usePublishStory();

	const handleAction = async (status: StoryStatus) => {
		try {
			const values = await form.validateFields();
			// update
			const payload: UpdateStoryRequest = {
				id: storyId!,
				genreId: values.genreId,
				fileId: fileId ?? '',
				userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',

				title: values.title,
				description: values.description,
				language: values.language,
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
					adminId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
				}).unwrap();
			}

			notification.success({
				message:
					status === StoryStatus.PUBLISHED
						? t('approveSuccess')
						: t('rejectSuccess'),
				placement: 'topRight',
			});
			navigate(-1);
		} catch (error) {
			console.error('Approve error:', error);
			notification.error({
				message:
					status === StoryStatus.PUBLISHED
						? t('approveError')
						: t('rejectError'),
				placement: 'topRight',
			});
		}
	};

	const handleCancel = () => {
		modal.confirm({
			title: t('confirmCancelApproveStoryTitle'),
			content: t('confirmCancelApproveStoryMessage'),
			okText: t('submit'),
			cancelText: t('cancel'),
			onOk: () => {
				if (story.fileId && story.fileId !== originStory.fileId) {
					setStory((prev) => ({ ...prev, fileId: story.fileId }));
				}
				navigate(-1);
			},
		});
	};

	const translatedLanguages = Object.values(Language).filter(
		(lang) => lang !== story.language,
	);

	if (
		storyDetail.isFetching ||
		storyDetail.isLoading ||
		updateStory.isLoading ||
		publishStory.isLoading
	) {
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
									setFileId(uploadedFile.id);
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
								if (!fileId) return;
								setFileloading(true);
								const currentId = fileId;
								setFileId('');
								setFileList([]);
								setStory((prev) => ({ ...prev, fileId: '' }));
								try {
									await deleteFileTrigger(currentId).unwrap();
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
				>
					<TextEditor />
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
							<TextEditor />
						</Form.Item>
					</Card>
				))}

				<Form.Item>
					<Space style={{ marginTop: 15 }}>
						<Button
							type="primary"
							disabled={fileloading}
							onClick={() => handleAction(StoryStatus.PUBLISHED)}
						>
							{t('approve')}
						</Button>
						<Button
							danger
							disabled={fileloading}
							onClick={() => handleAction(StoryStatus.REJECTED)}
						>
							{t('reject')}
						</Button>
						<Button disabled={fileloading} onClick={handleCancel}>
							{t('cancel')}
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default ApproveStoryPage;
