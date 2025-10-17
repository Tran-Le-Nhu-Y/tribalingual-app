import React from 'react';
import { List, Avatar, Typography, Space, Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text, Paragraph } = Typography;

interface CommentItem {
	id: number;
	authorName: string;
	avatarUrl: string;
	content: string;
	datetime: string;
}

interface CommentListProps {
	comments: CommentItem[];
	onLoadMore?: () => void;
	hasMore?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
	comments,
	onLoadMore,
	hasMore,
}) => {
	const { t } = useTranslation('standard');
	return (
		<>
			<List
				dataSource={comments}
				renderItem={(item) => (
					<List.Item
						key={item.id}
						style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 0' }}
					>
						<Space align="start" style={{ width: '100%' }}>
							<Avatar src={item.avatarUrl} size="large" />

							<Card
								size="small"
								style={{
									flex: 1,
									borderRadius: 10,
									background: '#fafafa',
								}}
							>
								<Space
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}
								>
									<Text strong>{item.authorName}</Text>
									<Text type="secondary" style={{ fontSize: 12 }}>
										{item.datetime}
									</Text>
								</Space>
								<Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
									{item.content}
								</Paragraph>
							</Card>
						</Space>
					</List.Item>
				)}
			/>

			{hasMore && (
				<Space style={{ textAlign: 'center', marginTop: 16 }}>
					<Button onClick={onLoadMore}>{t('seeMoreComments')}</Button>
				</Space>
			)}
		</>
	);
};

export default CommentList;
