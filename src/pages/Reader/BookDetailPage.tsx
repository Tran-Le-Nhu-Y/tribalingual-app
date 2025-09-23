import { Button, Row, Col, Typography, Space, Descriptions, Image } from 'antd';
import {
	EyeOutlined,
	DownloadOutlined,
	HeartOutlined,
} from '@ant-design/icons';
import { RankingList } from '../../components';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const BookDetailPage = () => {
	const { t } = useTranslation('standard');
	const relatedBooks = [
		{
			id: 1,
			title: 'Chuyện bên bếp lửa',
			image: './mimi.jpg',
			likes: 120,
			views: 300,
		},

		{
			id: 2,
			title: "Truyện cổ H'mông",
			image: './mimi.jpg',
			likes: 120,
			views: 300,
		},
		{
			id: 3,
			title: 'Chuyện bên bếp lửa',
			image: './mimi.jpg',
			likes: 120,
			views: 300,
		},
		{
			id: 4,
			title: 'Chuyện bên bếp lửa',
			image: './mimi.jpg',
			likes: 120,
			views: 300,
		},
		{
			id: 5,
			title: 'Chuyện bên bếp lửa',
			image: './mimi.jpg',
			likes: 120,
			views: 300,
		},
		{
			id: 6,
			title: 'Chuyện bên bếp lửa',
			image: './mimi.jpg',
			likes: 120,
			views: 300,
		},
		{
			id: 7,
			title: 'Chuyện bên bếp lửa',
			image: './mimi.jpg',
			likes: 120,
			views: 300,
		},
		{
			id: 8,
			title: 'Chuyện bên bếp lửa',
			image: './mimi.jpg',
			likes: 120,
			views: 300,
		},
	];
	const paragraphStyle = {
		lineHeight: 1.8,
		textAlign: 'justify' as const,
		maxHeight: '7.2em', // 3 lines * line-height (1.8em)
		overflow: 'hidden',
	};

	return (
		<div style={{ padding: 16, background: '#f5f7fb', borderRadius: 8 }}>
			<Row gutter={[24, 24]} align="top">
				{/* Bìa sách + Thông tin */}
				<Col xs={24} sm={24} md={24} lg={10} xl={8} xxl={6}>
					<div style={{ textAlign: 'center' }}>
						<Image
							src="./mimi.jpg"
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
					</div>

					<Descriptions column={1} colon={false} size="middle" bordered>
						<Descriptions.Item label="Tác giả">Sưu tầm</Descriptions.Item>
						<Descriptions.Item label="Nhà xuất bản">
							NXB Việt Nam
						</Descriptions.Item>
						<Descriptions.Item label="Thể loại">
							Truyện cổ tích
						</Descriptions.Item>
						<Descriptions.Item label="Lượt xem">3</Descriptions.Item>
						<Descriptions.Item label="Lượt yêu thích">1</Descriptions.Item>
					</Descriptions>
				</Col>

				{/* Nội dung sách */}
				<Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={18}>
					<div style={{ paddingRight: 12 }}>
						<Title level={2} style={{ marginBottom: 0 }}>
							H’MONG FOLKLORE
						</Title>
						<Title level={4} style={{ margin: '4px 0' }}>
							CỔ TÍCH NGƯỜI H’MÔNG
						</Title>
						<Title
							level={4}
							style={{ marginTop: 0, marginBottom: 24, color: '#146C94' }}
						>
							ZAJ DAB NEEG HMOOB
						</Title>

						<Paragraph style={paragraphStyle}>
							On a high mountain, there was a big cave. In the cave, there was a
							bad monster On a high mountain, there was a big cave. In the cave,
							there was a bad monster On a high mountain, there was a big cave.
							In the cave, there was a bad monster On a high mountain, there was
							a big cave. In the cave, there was a bad monster On a high
							mountain, there was a big cave. In the cave, there was a bad
							monster On a high mountain, there was a big cave. In the cave,
							there was a bad monster...
						</Paragraph>
						<Paragraph style={paragraphStyle}>
							Hauv ib lub roob siab ntawd, muaj ib lub qhov tsua loj heev Hauv
							ib lub roob siab ntawd, muaj ib lub qhov tsua loj heev Hauv ib lub
							roob siab ntawd, muaj ib lub qhov tsua loj heev Hauv ib lub roob
							siab ntawd, muaj ib lub qhov tsua loj heev Hauv ib lub roob siab
							ntawd, muaj ib lub qhov tsua loj heev Hauv ib lub roob siab ntawd,
							muaj ib lub qhov tsua loj heev ...
						</Paragraph>
						<Paragraph style={paragraphStyle}>
							Trên ngọn núi cao nọ, có một cái hang lớn. Trong hang có một con
							quỷ dữ Trên ngọn núi cao nọ, có một cái hang lớn. Trong hang có
							một con quỷ dữ Trên ngọn núi cao nọ, có một cái hang lớn. Trong
							hang có một con quỷ dữ Trên ngọn núi cao nọ, có một cái hang lớn.
							Trong hang có một con quỷ dữ Trên ngọn núi cao nọ, có một cái hang
							lớn. Trong hang có một con quỷ dữ Trên ngọn núi cao nọ, có một cái
							hang lớn. Trong hang có một con quỷ dữ...
						</Paragraph>

						{/* Nút */}
						<Space size="middle" style={{ marginTop: 32, flexWrap: 'wrap' }}>
							<Button icon={<HeartOutlined />}>Yêu thích</Button>
							<Button
								type="primary"
								icon={<EyeOutlined />}
								style={{ borderRadius: 6 }}
							>
								Xem
							</Button>
							<Button
								type="primary"
								ghost
								icon={<DownloadOutlined />}
								style={{ borderRadius: 6 }}
							>
								Tải xuống
							</Button>
						</Space>
					</div>
				</Col>
			</Row>
			{/* Sách liên quan */}
			<div style={{ marginTop: 48 }}>
				<RankingList
					title={t('mayInterstedIn')}
					items={relatedBooks}
					maxItems={10}
					showRankingNumber={false}
				/>
			</div>
		</div>
	);
};

export default BookDetailPage;
