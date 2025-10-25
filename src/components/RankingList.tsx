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
			const scrollAmount = 300;
			listRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	const sortedItems = sortOption
		? items
				?.slice()
				.sort((a, b) => (b[sortOption] || 0) - (a[sortOption] || 0))
				.slice(0, maxItems)
		: items?.slice(0, maxItems);

	const handleScroll = () => {
		const element = listRef.current;
		if (!element) return;
		const { scrollLeft, scrollWidth, clientWidth } = element;
		const left = scrollLeft > 0;
		const right = scrollLeft + clientWidth < scrollWidth - 1;
		setShowLeft(left);
		setShowRight(right);
	};

	useEffect(() => {
		const listEl = listRef.current;
		if (!listEl) return;

		const timer = setTimeout(() => {
			handleScroll();
		}, 50);

		listEl.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);

		return () => {
			clearTimeout(timer);
			listEl.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [sortedItems]);

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
					padding: '10px 0px 0 15px',
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
					gap: 10,
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
					role="next-btn"
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
