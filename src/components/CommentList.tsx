import CommentItem from './CommentItem';
import { List, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import type { CommentResponse } from '../@types/response';

interface CommentListProps {
	comments: CommentResponse[];
	onLoadMore?: () => void;
	hasMore?: boolean;
	loading?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
	comments,
	onLoadMore,
	hasMore,
	loading = false,
}) => {
	const { t } = useTranslation('standard');

	return (
		<>
			<List
				dataSource={comments}
				loading={loading}
				renderItem={(item) => (
					<List.Item
						key={item.id}
						style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 0' }}
					>
						<CommentItem comment={item} />
					</List.Item>
				)}
			/>

			{hasMore && !loading && (
				<Space style={{ textAlign: 'center', marginTop: 16 }}>
					<Button onClick={onLoadMore}>{t('seeMoreComments')}</Button>
				</Space>
			)}
		</>
	);
};

export default CommentList;
