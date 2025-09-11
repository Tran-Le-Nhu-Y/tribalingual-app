import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadImage, TextEditor } from '../../components'; // import UploadFile
import Title from 'antd/es/typography/Title';
import { Form, Input, Button, message, Space, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const UploadStoryPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const [content, setContent] = useState('');
	const [language, setLanguage] = useState<string>('vi');
	const onFinish = (values: Record<string, unknown>) => {
		console.log('Form values:', { ...values, content });
		message.success('Câu chuyện đã được gửi!');
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
				{t('uploadYourStory')}
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
							value={language}
							onChange={setLanguage}
							options={[
								{ label: 'Tiếng Việt', value: 'vi' },
								{ label: 'English', value: 'en' },
								{ label: 'Hmong', value: 'hm' },
							]}
							style={{ width: 200 }}
						/>
					</Form.Item>
				</Form>

				<Form.Item
					label={t('storyContent')}
					required
					rules={[
						{
							validator: () =>
								content && content !== '<p></p>'
									? Promise.resolve()
									: Promise.reject(new Error('Vui lòng nhập nội dung!')),
						},
					]}
				>
					<TextEditor value={content} onChange={setContent} />
				</Form.Item>

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							{t('submit')}
						</Button>
						<Button htmlType="reset">{t('cancel')}</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	);
};

export default UploadStoryPage;
