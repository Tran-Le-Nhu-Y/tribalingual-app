import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadImage, TextEditor } from '../../components';
import Title from 'antd/es/typography/Title';
import { Form, Input, Button, message, Space, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router';

const ApproveStoryPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const navigate = useNavigate();
	const [language, setLanguage] = useState<string>('');
	const [translatedContent, setTranslatedContent] = useState<string>('');
	const originalStory = {
		title: 'Truyện số 1',
		description: 'Đây là mô tả truyện...',
		content: '<p>Nội dung gốc của truyện...</p>',
		image: '',
		language: 'Tiếng Việt',
	};

	const onFinish = () => {
		message.success('Câu chuyện đã được phê duyệt!');
	};

	const handleTranslate = () => {
		// ⚡ Giả lập dịch (sau này bạn gọi API dịch)
		const translations: Record<string, string> = {
			vi: 'Bản dịch Tiếng Việt của câu chuyện...',
			en: 'English translation of the story...',
			hm: 'Hmong translation of the story...',
		};

		setTranslatedContent(translations[language] || originalStory.content);
		message.success(`Đã dịch sang ${language}`);
	};

	return (
		<div
			style={{
				maxWidth: 920,
				margin: '0 auto',
				padding: '20px',
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

			<Form layout="vertical" onFinish={onFinish}>
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
					<UploadImage maxCount={1} />
				</Form.Item>
				<Form layout="inline" style={{ marginBottom: 20 }}>
					<Form.Item label="Ngôn ngữ của câu chuyện">
						<Select
							value={originalStory.language}
							style={{ width: 200 }}
							disabled
						/>
					</Form.Item>
				</Form>
				<Form.Item label={t('storyContent')}>
					<TextEditor value={originalStory.content} readOnly />
				</Form.Item>

				{/* Chọn ngôn ngữ dịch */}
				<Form layout="inline" style={{ marginBottom: 20 }}>
					<Form.Item label="Dịch sang ngôn ngữ">
						<Select
							value={language}
							onChange={setLanguage}
							options={[
								...(originalStory.language === 'Tiếng Việt'
									? [
											{ label: 'English', value: 'en' },
											{ label: 'Hmong', value: 'hm' },
									  ]
									: originalStory.language === 'English'
									? [
											{ label: 'Tiếng Việt', value: 'vi' },
											{ label: 'Hmong', value: 'hm' },
									  ]
									: [
											{ label: 'Tiếng Việt', value: 'vi' },
											{ label: 'English', value: 'en' },
									  ]),
							]}
							style={{ width: 200 }}
						/>
						<Button onClick={handleTranslate} style={{ marginLeft: 8 }}>
							Dịch
						</Button>
					</Form.Item>
				</Form>

				{/* Hiển thị nội dung sau khi dịch */}
				{translatedContent && (
					<Form.Item label="Bản dịch">
						<TextArea rows={10} value={translatedContent} />
					</Form.Item>
				)}

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							Duyệt
						</Button>
						<Button htmlType="reset" onClick={() => navigate(-1)}>
							{t('cancel')}
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ApproveStoryPage;
