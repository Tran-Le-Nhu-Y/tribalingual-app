import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useTranslation } from 'react-i18next';
import type { Story } from '../@types/entities';
import RankingListItem from './RankingListItem';
import { type SortStoryOptionType } from '../util';

interface RankingListProps {
	title?: string;
	items?: Story[];
	showRankingNumber?: boolean;
	maxItems?: number;
	sortOption?: SortStoryOptionType;
}

const RankingList: React.FC<RankingListProps> = ({
	items,
	title,
	showRankingNumber = true,
	maxItems = 10,
	sortOption, // default
}) => {
	const { t } = useTranslation('standard');
	const listRef = useRef<HTMLDivElement>(null);
	const [showLeft, setShowLeft] = useState(false);
	const [showRight, setShowRight] = useState(true);

	const scroll = (direction: 'left' | 'right') => {
		if (listRef.current) {
			const scrollAmount = 320;
			listRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	const handleScroll = () => {
		if (listRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
			setShowLeft(scrollLeft > 0);
			setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
		}
	};

	useEffect(() => {
		handleScroll();
		const listEl = listRef.current;
		listEl?.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);
		return () => {
			listEl?.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, []);
	const sortedItems = sortOption
		? items
				?.slice()
				.sort((a, b) => (b[sortOption] || 0) - (a[sortOption] || 0))
				.slice(0, maxItems)
		: items?.slice(0, maxItems);

	return (
		<div
			style={{
				background: 'linear-gradient(135deg, #0e2129ff,#0c5f80ff )',
				padding: '0px 10px 10px 0px',
				marginTop: 20,
				position: 'relative',
				borderRadius: 8,
			}}
		>
			<Title
				style={{
					paddingTop: 10,
					color: '#f9fbff',
					fontSize: 28,
					fontWeight: 700,
					letterSpacing: 1,
				}}
				level={3}
			>
				{title || t('mostRead')}
			</Title>

			{showLeft && (
				<Button
					shape="circle"
					icon={<LeftOutlined />}
					onClick={() => scroll('left')}
					style={{
						position: 'absolute',
						top: '50%',
						left: 0,
						transform: 'translateY(-50%)',
						zIndex: 3,
						background: 'rgba(0, 0, 0, 0.5)',
						color: '#f9fbff',
						border: 'none',
						boxShadow: '0 0 10px rgba(0,0,0,0.4)',
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.background = 'rgba(255,77,79,0.9)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.background = 'rgba(0,0,0,0.5)')
					}
				/>
			)}

			<div
				ref={listRef}
				style={{
					display: 'flex',
					overflowX: 'auto',
					overflowY: 'hidden',
					scrollBehavior: 'smooth',
					padding: '10px 10px 0 10px',
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}
			>
				{sortedItems?.map((item, index) => (
					<RankingListItem
						key={item.id}
						story={item}
						index={index}
						showRankingNumber={showRankingNumber}
					/>
				))}
			</div>

			{showRight && (
				<Button
					shape="circle"
					icon={<RightOutlined />}
					onClick={() => scroll('right')}
					style={{
						position: 'absolute',
						top: '50%',
						right: 0,
						transform: 'translateY(-50%)',
						zIndex: 3,
						background: 'rgba(0, 0, 0, 0.5)',
						color: '#fff',
						border: 'none',
						boxShadow: '0 0 10px rgba(0,0,0,0.4)',
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.background = 'rgba(255,77,79,0.9)')
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.background = 'rgba(0,0,0,0.5)')
					}
				/>
			)}
		</div>
	);
};

export default RankingList;
