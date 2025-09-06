import { Card, Typography, Button, Row, Col, ConfigProvider } from 'antd';
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface StoryCardProps {
	title: string;
	description?: string;
	image: string;
	likes: number;
	views: number;
	onDetailClick?: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
	title,
	image,
	likes,
	views,
	onDetailClick,
}) => {
	const { t } = useTranslation('standard');
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#1890ff',
				},
				components: {
					Button: {
						colorPrimary: '#4facfe',
						colorPrimaryHover: '#146C94',
						colorPrimaryActive: '#06425aff',
						lineWidth: 0,
						borderRadius: 20,
					},
				},
			}}
		>
			<Card
				hoverable
				style={{
					height: 300,
					width: 220,
					borderRadius: 12,
					border: '1px solid #03506F',
				}}
			>
				<div
					style={{
						position: 'relative',
						display: 'flex',
						justifyContent: 'center',
						paddingTop: 0,
					}}
				>
					<img
						alt={title}
						src={image}
						style={{
							width: 160,
							height: 200,
							objectFit: 'cover',
							borderRadius: 8,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: -20,
							right: -12,
							display: 'flex',
							gap: 4,
							color: '#999',
							fontSize: 12,
						}}
					>
						<span>
							<HeartOutlined /> {likes}
						</span>
						<span>
							<EyeOutlined /> {views}
						</span>
					</div>
				</div>
				<Title
					level={5}
					style={{
						textAlign: 'center',
						marginTop: 4,
						marginBottom: 2,
						width: '100%',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}
				>
					{title}
				</Title>
				{/* <Paragraph
					ellipsis={{ rows: 2 }}
					style={{ textAlign: 'center', color: '#555' }}
				>
					{description}
				</Paragraph> */}
				<Row justify="center">
					<Col>
						<Button
							type="primary"
							shape="round"
							size="middle"
							onClick={onDetailClick}
						>
							{t('seeDetails')}
						</Button>
					</Col>
				</Row>
			</Card>
		</ConfigProvider>
	);
};

export default StoryCard;
