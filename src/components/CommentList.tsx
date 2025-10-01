import React, { useState } from 'react';
import { List, Avatar, Typography, Space, Card, Button } from 'antd';

const { Text, Paragraph } = Typography;

interface CommentItem {
	id: number;
	author: string;
	avatar: string;
	content: string;
	datetime: string;
}

interface CommentListProps {
	comments: CommentItem[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
	const [visibleCount, setVisibleCount] = useState(5);

	const visibleComments = comments.slice(0, visibleCount);

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + 5);
	};

	return (
		<>
			<List
				dataSource={visibleComments}
				renderItem={(item) => (
					<List.Item
						key={item.id}
						style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 0' }}
					>
						<Space align="start" style={{ width: '100%' }}>
							<Avatar src={item.avatar} size="large" />

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
									<Text strong>{item.author}</Text>
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

			{visibleCount < comments.length && (
				<Space style={{ textAlign: 'center', marginTop: 16 }}>
					<Button onClick={handleLoadMore}>Xem thêm bình luận</Button>
				</Space>
			)}
		</>
	);
};

export default CommentList;
