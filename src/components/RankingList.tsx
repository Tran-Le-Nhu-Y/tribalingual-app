// import React, { useRef, useState, useEffect } from 'react';
// import { Button } from 'antd';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// import StoryCard from './StoryCard';
// import Title from 'antd/es/typography/Title';
// import { useTranslation } from 'react-i18next';

// interface RankingItem {
// 	id: number;
// 	title: string;
// 	description?: string;
// 	image: string;
// 	likes: number;
// 	views: number;
// }

// interface RankingListProps {
// 	title?: string;
// 	items: RankingItem[];
// }

// const RankingList: React.FC<RankingListProps> = ({ items, title }) => {
// 	const { t } = useTranslation('standard');
// 	const listRef = useRef<HTMLDivElement>(null);
// 	const [showLeft, setShowLeft] = useState(false);
// 	const [showRight, setShowRight] = useState(true);

// 	const scroll = (direction: 'left' | 'right') => {
// 		if (listRef.current) {
// 			const scrollAmount = 320;
// 			listRef.current.scrollBy({
// 				left: direction === 'left' ? -scrollAmount : scrollAmount,
// 				behavior: 'smooth',
// 			});
// 		}
// 	};

// 	const handleScroll = () => {
// 		if (listRef.current) {
// 			const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
// 			setShowLeft(scrollLeft > 0);
// 			setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
// 		}
// 	};

// 	useEffect(() => {
// 		handleScroll();
// 		const listEl = listRef.current;
// 		listEl?.addEventListener('scroll', handleScroll);
// 		window.addEventListener('resize', handleScroll);
// 		return () => {
// 			listEl?.removeEventListener('scroll', handleScroll);
// 			window.removeEventListener('resize', handleScroll);
// 		};
// 	}, []);

// 	return (
// 		<div
// 			style={{
// 				background: 'linear-gradient(135deg, #0e2129ff,#0c5f80ff )',
// 				padding: '0px 10px 20px 0px',
// 				marginTop: 20,
// 				position: 'relative',
// 				borderRadius: 8,
// 			}}
// 		>
// 			<Title
// 				style={{
// 					paddingTop: 10,
// 					color: '#f9fbff',
// 					fontSize: 28,
// 					fontWeight: 700,
// 					letterSpacing: 1,
// 				}}
// 				level={3}
// 			>
// 				{title || t('mostRead')}
// 			</Title>

// 			{showLeft && (
// 				<Button
// 					shape="circle"
// 					icon={<LeftOutlined />}
// 					onClick={() => scroll('left')}
// 					style={{
// 						position: 'absolute',
// 						top: '50%',
// 						left: 0,
// 						transform: 'translateY(-50%)',
// 						zIndex: 3,
// 						background: 'rgba(0, 0, 0, 0.5)',
// 						color: '#f9fbff',
// 						border: 'none',
// 						boxShadow: '0 0 10px rgba(0,0,0,0.4)',
// 					}}
// 					onMouseEnter={(e) =>
// 						(e.currentTarget.style.background = 'rgba(255,77,79,0.9)')
// 					}
// 					onMouseLeave={(e) =>
// 						(e.currentTarget.style.background = 'rgba(0,0,0,0.5)')
// 					}
// 				/>
// 			)}

// 			<div
// 				ref={listRef}
// 				style={{
// 					display: 'flex',
// 					gap: 22,
// 					overflowX: 'auto',
// 					scrollBehavior: 'smooth',
// 					padding: '10px 10px 0 10px',
// 					scrollbarWidth: 'none',
// 					msOverflowStyle: 'none',
// 				}}
// 			>
// 				<style>
// 					{`
// 						div::-webkit-scrollbar {
// 						display: none;
// 						}
// 					`}
// 				</style>

// 				{items.slice(0, 10).map((item, index) => (
// 					<div
// 						key={item.id}
// 						style={{
// 							position: 'relative',
// 							flex: '0 0 auto',
// 							width: 280,
// 							transition: 'transform 0.3s',
// 						}}
// 						onMouseEnter={(e) =>
// 							(e.currentTarget.style.transform = 'translateY(-5px)')
// 						}
// 						onMouseLeave={(e) =>
// 							(e.currentTarget.style.transform = 'translateY(0)')
// 						}
// 					>
// 						<div
// 							style={{
// 								position: 'absolute',
// 								top: 5,
// 								left: 5,
// 								width: 40,
// 								height: 40,
// 								borderRadius: '50%',
// 								background:
// 									index === 0
// 										? 'linear-gradient(135deg, #FFD700, #FFA500)'
// 										: index === 1
// 										? 'linear-gradient(135deg, #C0C0C0, #A9A9A9)'
// 										: index === 2
// 										? 'linear-gradient(135deg, #CD7F32, #8B4513)'
// 										: 'linear-gradient(135deg , #e072a4ff, #ff512f)',
// 								display: 'flex',
// 								alignItems: 'center',
// 								justifyContent: 'center',
// 								fontSize: 18,
// 								fontWeight: 'bold',
// 								color: '#fff',
// 								boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
// 								zIndex: 2,
// 							}}
// 						>
// 							{index + 1}
// 						</div>

// 						<StoryCard
// 							title={item.title}
// 							description={item.description}
// 							image={item.image}
// 							likes={item.likes}
// 							views={item.views}
// 							onDetailClick={() => console.log('Xem chi tiết', item.title)}
// 						/>
// 					</div>
// 				))}
// 			</div>

// 			{showRight && (
// 				<Button
// 					shape="circle"
// 					icon={<RightOutlined />}
// 					onClick={() => scroll('right')}
// 					style={{
// 						position: 'absolute',
// 						top: '50%',
// 						right: 0,
// 						transform: 'translateY(-50%)',
// 						zIndex: 3,
// 						background: 'rgba(0, 0, 0, 0.5)',
// 						color: '#fff',
// 						border: 'none',
// 						boxShadow: '0 0 10px rgba(0,0,0,0.4)',
// 					}}
// 					onMouseEnter={(e) =>
// 						(e.currentTarget.style.background = 'rgba(255,77,79,0.9)')
// 					}
// 					onMouseLeave={(e) =>
// 						(e.currentTarget.style.background = 'rgba(0,0,0,0.5)')
// 					}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default RankingList;

import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import StoryCard from './StoryCard';
import Title from 'antd/es/typography/Title';
import { useTranslation } from 'react-i18next';

interface RankingItem {
	id: number;
	title: string;
	description?: string;
	image: string;
	likes: number;
	views: number;
}

interface RankingListProps {
	title?: string;
	items: RankingItem[];
	showRankingNumber?: boolean; // mặc định true
	maxItems?: number; // cho phép giới hạn số hiển thị
}

const RankingList: React.FC<RankingListProps> = ({
	items,
	title,
	showRankingNumber = true,
	maxItems = 10,
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

	return (
		<div
			style={{
				background: 'linear-gradient(135deg, #0e2129ff,#0c5f80ff )',
				padding: '0px 10px 15px 0px',
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
					gap: 22,
					overflowX: 'auto',
					scrollBehavior: 'smooth',
					padding: '10px 10px 0 10px',
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}
			>
				<style>
					{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
				</style>

				{items.slice(0, maxItems).map((item, index) => (
					<div
						key={item.id}
						style={{
							position: 'relative',
							flex: '0 0 auto',
							width: 280,
							transition: 'transform 0.3s',
							marginBottom: 5,
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.transform = 'scale(1.03)')
						}
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
							title={item.title}
							description={item.description}
							image={item.image}
							likes={item.likes}
							views={item.views}
							onDetailClick={() => console.log('Xem chi tiết', item.title)}
						/>
					</div>
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
