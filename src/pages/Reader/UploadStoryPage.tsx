import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadImage, TextEditor } from '../../components'; // import UploadFile
import Title from 'antd/es/typography/Title';
import { Form, Input, Button, Space, Select, App, Spin, Card } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDeleteFile, useGetGenres, useUploadFile } from '../../service';
import type { Story } from '../../@types/entities';
import { Language } from '../../util';

const UploadStoryPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const { notification, modal } = App.useApp();
	const initialStory = {
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
		status: '',
		viewCount: 0,
		commentCount: 0,
		favoriteCount: 0,
	};
	const [story, setStory] = useState<Story>(initialStory);
	const [form] = Form.useForm();
	const handleCancel = () => {
		modal.confirm({
			title: t('confirmCancelTitle'),
			content: t('confirmCancelMessage'),
			okText: t('submit'),
			cancelText: t('cancel'),
			onOk: () => {
				form.resetFields(); // reset fields of form
				setStory(initialStory); // reset state story
			},
		});
	};

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

	// // upload story
	// const hanldeSubmit = async () => {
	// 	try {
	// 		const file = fileList[0];
	// 		if (fileList.length > 0) {
	// 			const uploadedFileId = await uploadFile({ file }).unwrap(); // get fileId from server
	// 		}
	// 	} catch (error) {}
	// };

	const [fileloading, setFileloading] = useState(false);
	const [uploadFile] = useUploadFile();
	const [deleteFileTrigger] = useDeleteFile();

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
				{t('uploadYourStory')}
			</Title>

			<Form form={form} layout="vertical" onFinish={() => {}}>
				<Form.Item
					label={t('storyTitle')}
					name="title"
					rules={[{ required: true, message: t('storyTitleRequired') }]}
				>
					<Input
						placeholder={t('storyTitlePlaceholder')}
						onChange={(e) => {
							setStory((prev) => ({
								...prev,
								title: e.target.value,
							}));
						}}
					/>
				</Form.Item>

				<Form.Item label={t('storyDescription')} name="description">
					<TextArea
						rows={4}
						placeholder={t('storyDescriptionPlaceholder')}
						onChange={(e) => {
							setStory((prev) => ({
								...prev,
								description: e.target.value,
							}));
						}}
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
							onChange={async (files) => {
								if (!files || files.length === 0) return;
								const file = files[0].originFileObj;
								if (!file) return;
								setFileloading(true);
								try {
									const uploadedFile = await uploadFile({ file }).unwrap();
									setStory((prev) => ({ ...prev, fileId: uploadedFile.id }));
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
						rules={[{ required: true }]}
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
						rules={[{ required: true }]}
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
					name="content"
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
						value={
							story.language === Language.VIETNAMESE
								? story.vietnameseContent ?? ''
								: story.language === Language.ENGLISH
								? story.englishContent ?? ''
								: story.hmongContent ?? ''
						}
						onChange={(value) => {
							setStory((prev) => ({
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
									prev.language === Language.HMONG ? value : prev.hmongContent,
							}));
						}}
					/>
				</Form.Item>

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							{t('submit')}
						</Button>
						<Button onClick={handleCancel}>{t('cancel')}</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default UploadStoryPage;
