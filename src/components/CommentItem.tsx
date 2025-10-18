// CommentItem.tsx
import React from 'react';
import { Card, Space, Typography, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import type { CommentResponse } from '../@types/response';
import { useAuth0User } from '../hook/useAuth0User';
const { Text, Paragraph } = Typography;

interface CommentItemProps {
	comment: CommentResponse;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
	const { t } = useTranslation('standard');
	const { user, loading } = useAuth0User(comment.userId!);

	return (
		<Space align="start" style={{ width: '100%' }}>
			<Avatar
				src={loading ? undefined : user?.picture || '/unknow_user.jpg'}
				size="large"
			/>

			<Card
				size="small"
				style={{
					flex: 1,
					borderRadius: 10,
					background: '#fafafa',
					boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
				}}
			>
				<Space
					direction="vertical"
					style={{ width: '100%', alignItems: 'flex-start' }}
				>
					<Space
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Text strong>
							{loading ? t('loading') : user?.name || 'Unknown'}
						</Text>
						<Text type="secondary" style={{ fontSize: 12 }}>
							{new Date(comment.createdAt).toLocaleString()}
						</Text>
					</Space>
					<Paragraph style={{ margin: 0 }}>{comment.content}</Paragraph>
				</Space>
			</Card>
		</Space>
	);
};

export default CommentItem;
