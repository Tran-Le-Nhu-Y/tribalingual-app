import React, { useState } from 'react';
import { Button, Card, Select, Typography, message, Space } from 'antd';
import { useNavigate, useParams } from 'react-router';

const { Title, Paragraph } = Typography;

const StoryUploadedDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	// Giả lập dữ liệu
	const story = {
		id,
		title: `Truyện số ${id}`,
		author: `User ${id}`,
		content: `Đây là nội dung truyện số ${id}. Nội dung có thể dài và chi tiết.`,
	};

	const [language, setLanguage] = useState<string>('vi');
	const [translated, setTranslated] = useState<string | null>(null);

	const handleTranslate = () => {
		// Giả lập dịch
		const translations: Record<string, string> = {
			hmong: `Hmong translation of story ${id}`,
			en: `English translation of story ${id}`,
			vi: story.content,
		};
		setTranslated(translations[language]);
		message.success(`Đã dịch sang ${language.toUpperCase()}`);
	};

	const handleApprove = () => {
		message.success('Truyện đã được duyệt!');
		navigate('/admin/story-management');
	};

	return (
		<div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
			<Card style={{ maxWidth: 800, width: '100%' }}>
				<Title level={3}>{story.title}</Title>
				<p>
					<b>Tác giả:</b> {story.author}
				</p>
				<Paragraph>{story.content}</Paragraph>

				<Space style={{ marginBottom: 16 }}>
					<Select
						value={language}
						onChange={setLanguage}
						style={{ width: 200 }}
						options={[
							{ label: 'Tiếng Hmong', value: 'hmong' },
							{ label: 'Tiếng Anh', value: 'en' },
							{ label: 'Tiếng Việt', value: 'vi' },
						]}
					/>
					<Button type="primary" onClick={handleTranslate}>
						Dịch
					</Button>
				</Space>

				{translated && (
					<Card type="inner" title="Bản dịch">
						<Paragraph>{translated}</Paragraph>
					</Card>
				)}

				<div style={{ marginTop: 20 }}>
					<Button type="primary" onClick={handleApprove}>
						Duyệt truyện
					</Button>
					<Button style={{ marginLeft: 10 }} onClick={() => navigate(-1)}>
						Quay lại
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default StoryUploadedDetailPage;
