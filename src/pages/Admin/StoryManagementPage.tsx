import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
	Table,
	Button,
	Space,
	Tag,
	Popconfirm,
	Input,
	ConfigProvider,
	Card,
	App,
	Tooltip,
} from 'antd';
import type { TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import type { InputRef } from 'antd';
import Highlighter from 'react-highlight-words';
import Title from 'antd/es/typography/Title';
import { appTheme } from '../../theme/theme';
import { useNavigate } from 'react-router';
import { PathHolders, RoutePaths, StoryStatus } from '../../util';
import { useTranslation } from 'react-i18next';
import { useGetStories } from '../../service';
import type { Story } from '../../@types/entities';
import dayjs from 'dayjs';

type DataIndex = keyof Story;

const StoryManagementPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState<keyof Story | ''>('');
	const searchInput = useRef<InputRef>(null);
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();

	const handleReject = (id: string) => {
		return id;
	};

	const handleDelete = (id: string) => {
		return id;
	};

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps['confirm'],
		dataIndex: DataIndex,
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex,
	): TableColumnType<Story> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<Card onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${String(dataIndex)}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button type="link" size="small" onClick={() => close()}>
						Close
					</Button>
				</Space>
			</Card>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		filterDropdownProps: {
			onOpenChange(open) {
				if (open) {
					setTimeout(() => searchInput.current?.select(), 100);
				}
			},
		},
		render: (text: string) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	//Get all stories
	const [storiesQuery, setStoriesQuery] = useState<GetQuery>({
		offset: 0,
		limit: 10, //  10 item
	});
	const stories = useGetStories(storiesQuery!, {
		skip: !storiesQuery,
	});
	useEffect(() => {
		if (stories.isError) {
			notification.error({
				message: t('dataLoadingError'),
				description: t('storiesLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
	}, [notification, stories.isError, t]);

	const content = useMemo(() => {
		if (stories.isError) return [];
		if (stories.data?.content)
			return stories.data.content.map(
				(story) =>
					({
						...story,
						id: story.id,
					} as Story),
			);
		return [];
	}, [stories.data?.content, stories.isError]);

	const columns: TableColumnsType<Story> = [
		{
			title: t('storyTitle'),
			dataIndex: 'title',
			key: 'title',
			...getColumnSearchProps('title'),
		},
		{
			title: t('language'),
			dataIndex: 'language',
			key: 'language',
			width: 150,
			...getColumnSearchProps('language'),
		},
		{
			title: t('status'),
			dataIndex: 'status',
			key: 'status',
			width: 110,
			filters: [
				{ text: 'Pending', value: StoryStatus.PENDING },
				{ text: 'Published', value: StoryStatus.PUBLISHED },
				{ text: 'Rejected', value: StoryStatus.REJECTED },
				{ text: 'Hidden', value: StoryStatus.HIDDEN },
				{ text: 'Updated', value: StoryStatus.UPDATED },
			],
			onFilter: (value, record) => record.status === value,
			render: (status: Story['status']) => {
				const statusColors: Record<StoryStatus, string> = {
					PENDING: 'orange',
					PUBLISHED: 'green',
					REJECTED: 'red',
					HIDDEN: 'gray',
					UPDATED: 'blue',
				};
				return <Tag color={statusColors[status]}>{status}</Tag>;
			},
		},
		{
			title: t('uploadedDate'),
			dataIndex: 'uploadedDate',
			key: 'uploadedDate',
			width: 170,
			sorter: (a, b) => {
				const da = a.uploadedDate ? new Date(a.uploadedDate).getTime() : 0;
				const db = b.uploadedDate ? new Date(b.uploadedDate).getTime() : 0;
				return da - db;
			},
			render: (date: Story['uploadedDate']) =>
				date ? dayjs(date).format('DD/MM/YYYY HH:mm:ss') : '-',
		},
		{
			title: t('publishedDate'),
			dataIndex: 'publishedDate',
			key: 'publishedDate',
			width: 170,
			sorter: (a, b) => {
				const da = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
				const db = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
				return da - db;
			},
			render: (date: Story['publishedDate']) =>
				date ? dayjs(date).format('DD/MM/YYYY HH:mm:ss') : '-',
		},
		{
			title: t('action'),
			key: 'action',
			width: 180,
			render: (params) => (
				<Space>
					{params.status === StoryStatus.PENDING && (
						<>
							<Tooltip title={t('seeAndApprove')}>
								<Button
									type="primary"
									size="small"
									icon={<CheckOutlined />}
									onClick={() =>
										navigate(
											RoutePaths.APPROVE_STORY.replace(
												`:${PathHolders.STORY_ID}`,
												String(params.id),
											),
										)
									}
								/>
							</Tooltip>
							<Tooltip title={t('reject')}>
								<Button
									danger
									size="small"
									icon={<CloseOutlined />}
									onClick={() => handleReject(params.id)}
								/>
							</Tooltip>
						</>
					)}
					<Tooltip title={t('seeDetails')}>
						<Button
							type="primary"
							size="small"
							icon={<EyeOutlined />}
							onClick={() =>
								navigate(
									RoutePaths.STORY_DETAIL.replace(
										`:${PathHolders.STORY_ID}`,
										String(params.id),
									),
								)
							}
						/>
					</Tooltip>
					<Tooltip title={t('update')}>
						<Button
							type="primary"
							size="small"
							icon={<EditOutlined />}
							onClick={
								() => {}
								// navigate(
								// 	RoutePaths.UPDATE_STORY.replace(
								// 		`:${PathHolders.STORY_ID}`,
								// 		String(params.id),
								// 	),
								// )
							}
						/>
					</Tooltip>
					<Tooltip title={t('delete')}>
						<Popconfirm
							title={t('deleteStoryConfirm')}
							onConfirm={() => handleDelete(params.id)}
							cancelText={t('cancel')}
							okText={t('delete')}
							okButtonProps={{ danger: true }}
						>
							<Button danger size="small" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<Card style={{ padding: 5 }}>
			<ConfigProvider
				theme={{
					token: appTheme.token,
				}}
			>
				<Title
					style={{
						margin: 0,
						paddingTop: 4,
						marginBottom: 16,
						fontSize: 28,
						fontWeight: 700,
						letterSpacing: 1,
						color: appTheme.token.colorPrimary,
					}}
					level={3}
				>
					{t('storyUploadedManagement')}
				</Title>

				<Table<Story>
					rowKey="id"
					columns={columns}
					dataSource={content}
					scroll={{ x: 'max-content' }}
					pagination={{
						current: (stories.data?.page_number ?? 0) + 1,
						pageSize: stories.data?.page_size ?? 5,
						total: stories.data?.total_elements ?? 0,
						onChange: (page, pageSize) => {
							setStoriesQuery({
								offset: (page - 1) * pageSize,
								limit: pageSize,
							});
						},
					}}
					bordered
				/>
			</ConfigProvider>
		</Card>
	);
};

export default StoryManagementPage;
