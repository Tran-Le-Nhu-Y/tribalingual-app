import { Card, Typography, Button, Row, Col } from 'antd';
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { appTheme } from '../theme/theme';

const { Title } = Typography;

interface StoryCardProps {
	title: string;
	description?: string;
	imageUrl: string;
	likes: number;
	views: number;
	onDetailClick?: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
	title,
	imageUrl,
	likes,
	views,
	onDetailClick,
}) => {
	const { t } = useTranslation('standard');
	return (
		<Card
			hoverable
			style={{
				height: 300,
				width: 220,
				borderRadius: 12,
				border: appTheme.token.colorPrimary,
				boxShadow: '2px  4px 4px rgba(0,0,0,0.4)',
				marginBottom: 8,
				overflow: 'visible',
				position: 'relative',
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
					src={imageUrl}
					style={{
						width: 160,
						height: 200,
						objectFit: 'cover',
						borderRadius: 8,
						position: 'relative',
						zIndex: 1,
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
	);
};

export default StoryCard;
