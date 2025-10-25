// RankingListItem.tsx
import React from 'react';
import StoryCard from './StoryCard';
import { useGetFileById } from '../service';
import type { Story } from '../@types/entities';
import { useNavigate } from 'react-router';
import { PathHolders, RoutePaths } from '../util';

interface Props {
	story: Story;
	index: number;
	showRankingNumber: boolean;
}

const RankingListItem: React.FC<Props> = ({
	story,
	index,
	showRankingNumber,
}) => {
	const file = useGetFileById(story.fileId!, {
		skip: !story.fileId,
	});
	const imageUrl = file.data?.url || './placeholder.jpg';
	const navigate = useNavigate();
	return (
		<div
			style={{
				position: 'relative',
				flex: '0 0 240px',
				flexShrink: 0,
				width: 240,
				transition: 'transform 0.3s',
				marginBottom: 5,
			}}
			onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
			onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
		>
			{showRankingNumber && (
				<div
					style={{
						position: 'absolute',
						top: 5,
						left: 5,
						width: 40,
						height: 40,
						borderRadius: '50%',
						background:
							index === 0
								? 'linear-gradient(135deg, #FFD700, #FFA500)'
								: index === 1
								? 'linear-gradient(135deg, #C0C0C0, #A9A9A9)'
								: index === 2
								? 'linear-gradient(135deg, #CD7F32, #8B4513)'
								: 'linear-gradient(135deg , #e072a4ff, #ff512f)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 18,
						fontWeight: 'bold',
						color: '#fff',
						boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
						zIndex: 2,
					}}
				>
					{index + 1}
				</div>
			)}

			<StoryCard
				title={story.title}
				description={story.description}
				imageUrl={imageUrl}
				likes={story.favoriteCount}
				views={story.viewCount}
				onDetailClick={() =>
					navigate(
						RoutePaths.STORY_DETAIL.replace(
							`:${PathHolders.STORY_ID}`,
							story.id,
						),
					)
				}
			/>
		</div>
	);
};

export default RankingListItem;
