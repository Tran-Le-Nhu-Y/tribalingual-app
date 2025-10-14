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
import { useDeleteStory, useGetStories } from '../../service';
import type { Story } from '../../@types/entities';
import dayjs from 'dayjs';
import type { GetQuery } from '../../@types/queries';
import { DeleteError } from '../../util/errors';
import { LoadingScreen } from '../../components';
import { useAuthUserId } from '../../util/useAuthUserId';

type DataIndex = keyof Story;

const StoryManagementPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState<keyof Story | ''>('');
	const searchInput = useRef<InputRef>(null);
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();
	const { getUserId } = useAuthUserId();

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

	// delete story
	const [deleteStoryTrigger, deleteStory] = useDeleteStory();
	const handleDelete = async (storyId: string) => {
		const userId = getUserId();
		if (!userId) return;
		try {
			await deleteStoryTrigger({
				storyId: storyId,
				userId: userId,
			}).unwrap();
			notification.success({
				message: t('deleteStorySuccess'),
				placement: 'topRight',
			});
			setStoriesQuery((prev) => ({ ...prev }));
		} catch (error) {
			switch (error) {
				case DeleteError.NOT_FOUND: {
					notification.error({
						message: t('storyDeleteError'),
						description: t('storyNotFound'),
						placement: 'topRight',
					});
					break;
				}
				case DeleteError.UNKNOWN_ERROR: {
					notification.error({
						message: t('deleteStoryFailed'),
						placement: 'topRight',
					});
					break;
				}
			}
		}
	};

	const handleReject = (id: string) => {
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
			width: 120,
			filters: [
				{ text: t('pending'), value: StoryStatus.PENDING },
				{ text: t('published'), value: StoryStatus.PUBLISHED },
				{ text: t('rejected'), value: StoryStatus.REJECTED },
				{ text: t('hidden'), value: StoryStatus.HIDDEN },
				{ text: t('updated'), value: StoryStatus.UPDATED },
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
					{params.status === StoryStatus.PUBLISHED && (
						<>
							<Tooltip title={t('seeDetails')}>
								<Button
									type="primary"
									size="small"
									icon={<EyeOutlined />}
									onClick={() =>
										navigate(
											RoutePaths.STORY_UPLOADED_DETAIL.replace(
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
						</>
					)}
					{params.status === StoryStatus.PENDING && (
						<>
							<Tooltip title={t('seeAndApprove')}>
								<Button
									type="primary"
									size="small"
									icon={<CheckOutlined />}
									onClick={() =>
										navigate(
											RoutePaths.APPROVE_STORY_UPLOADED.replace(
												`:${PathHolders.STORY_ID}`,
												String(params.id),
											),
										)
									}
								/>
							</Tooltip>
							<Tooltip title={t('reject')}>
								<Popconfirm
									title={t('rejectStoryConfirm')}
									onConfirm={() => handleReject(params.id)}
									cancelText={t('cancel')}
									okText={t('submit')}
									okButtonProps={{ danger: true }}
								>
									<Button danger size="small" icon={<CloseOutlined />} />
								</Popconfirm>
							</Tooltip>
						</>
					)}

					<Tooltip title={t('delete')}>
						<Popconfirm
							title={t('deleteStoryConfirm')}
							onConfirm={() => handleDelete(params.id)}
							cancelText={t('cancel')}
							okText={t('delete')}
							okButtonProps={{ danger: true }}
							align={{ offset: [-10, -10] }}
						>
							<Button danger size="small" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];

	if (deleteStory.isLoading || stories.isLoading) {
		return <LoadingScreen />;
	}

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
