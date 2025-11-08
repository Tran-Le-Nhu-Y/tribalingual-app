import React, { useEffect, useState } from 'react';
import { AutoComplete, Empty, Input, Spin } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLazySearchStoriesByTitle } from '../service';
import type { Story } from '../@types/entities';
import { PathHolders, RoutePaths } from '../util';
import { useDebounce } from '../hook/useDebounce';

// const getRandomInt = (max: number, min = 0) =>
// 	Math.floor(Math.random() * (max - min + 1)) + min;

interface StorySearchProps {
	width?: number;
}

// const searchResult = (query: string) =>
// 	Array.from({ length: getRandomInt(5) })
// 		.join('.')
// 		.split('.')
// 		.map((_, idx) => {
// 			const category = `${query}${idx}`;
// 			return {
// 				value: category,
// 				label: (
// 					<div
// 						style={{
// 							display: 'flex',
// 							justifyContent: 'space-between',
// 						}}
// 					>
// 						<span>
// 							Found {query} on{' '}
// 							<a
// 								href={`https://s.taobao.com/search?q=${query}`}
// 								target="_blank"
// 								rel="noopener noreferrer"
// 							>
// 								{category}
// 							</a>
// 						</span>
// 						<span>{getRandomInt(200, 100)} results</span>
// 					</div>
// 				),
// 			};
// 		});

const StorySearch: React.FC<StorySearchProps> = ({ width }) => {
	const { t } = useTranslation('standard');
	const navigate = useNavigate();
	const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm);

	//search
	const [searchTrigger, searchResults] = useLazySearchStoriesByTitle();

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		setIsSearching(true);
	};

	useEffect(() => {
		setIsSearching(false);
		if (debouncedSearchTerm.trim().length === 0) return;

		searchTrigger({ offset: 0, limit: 5, title: debouncedSearchTerm });
	}, [debouncedSearchTerm, searchTrigger]);

	useEffect(() => {
		if (!searchResults || !searchResults?.data) {
			setOptions([]);
			return;
		}
		const opts = searchResults.data.content.map((story: Story) => ({
			value: story.title,
			key: story.id,
			label: (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 8,
					}}
				>
					{story.file?.url && (
						<img
							src={story.file.url}
							alt={story.title}
							style={{
								width: 30,
								height: 30,
								objectFit: 'cover',
								borderRadius: 4,
							}}
						/>
					)}
					<span style={{ flex: 1 }}>{story.title}</span>
				</div>
			),
		}));
		setOptions(opts);
	}, [searchResults, searchResults.data, width]);

	const onSelect = (title: string) => {
		if (!searchResults || !searchResults?.data) return;
		const story = searchResults.data.content.find((s) => s.title === title);
		if (story) {
			navigate(
				RoutePaths.STORY_DETAIL.replace(
					`:${PathHolders.STORY_ID}`,
					story.id.toString(),
				),
			);
		}
	};

	let notFoundContent = null;
	if (searchResults.isLoading || isSearching) {
		notFoundContent = <Spin size="small" />;
	} else if (
		!searchResults.isFetching &&
		searchTerm.trim() !== '' &&
		searchResults?.data?.content?.length === 0
	) {
		notFoundContent = (
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={t('noStoriesFound')}
			/>
		);
	}

	return (
		<AutoComplete
			popupMatchSelectWidth={width}
			style={{
				width: '100%',
				maxWidth: width,
			}}
			options={options}
			onSelect={onSelect}
			onSearch={handleSearch}
			notFoundContent={notFoundContent}
			autoClearSearchValue
			autoFocus
		>
			<Input.Search
				size="large"
				placeholder={t('searchStoriesPlaceholder')}
				enterButton
				value={searchTerm}
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</AutoComplete>
	);
};

export default StorySearch;
