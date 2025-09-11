import React, { useRef, useState } from 'react';
import {
	Table,
	Button,
	Space,
	Tag,
	Popconfirm,
	Input,
	ConfigProvider,
} from 'antd';
import type { TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import Highlighter from 'react-highlight-words';
import Title from 'antd/es/typography/Title';
import { appTheme } from '../../theme/theme';
import { useNavigate } from 'react-router';
import { PathHolders, RoutePaths } from '../../util';

interface Story {
	id: number;
	title: string;
	language: string;
	author: string;
	status: 'pending' | 'approved' | 'rejected';
	createdAt: string;
}

type DataIndex = keyof Story;

const StoryManagementPage: React.FC = () => {
	const [stories, setStories] = useState<Story[]>(
		Array.from({ length: 55 }).map((_, i) => ({
			id: i + 1,
			title: `Truyện số ${i + 1}`,
			language: i % 2 === 0 ? 'Tiếng Việt' : 'English',
			author: `User ${i + 1}`,
			status: i % 3 === 0 ? 'approved' : 'pending',
			createdAt: new Date().toLocaleDateString(),
		})),
	);
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState<keyof Story | ''>('');
	const searchInput = useRef<InputRef>(null);

	const handleReject = (id: number) => {
		setStories((prev) =>
			prev.map((story) =>
				story.id === id ? { ...story, status: 'rejected' } : story,
			),
		);
	};

	const handleDelete = (id: number) => {
		setStories((prev) => prev.filter((story) => story.id !== id));
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
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
			</div>
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
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 70,
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			key: 'title',
			...getColumnSearchProps('title'),
		},
		{
			title: 'Ngôn ngữ',
			dataIndex: 'language',
			key: 'language',
			width: 150,
			...getColumnSearchProps('language'),
		},
		{
			title: 'Người đăng',
			dataIndex: 'author',
			key: 'author',
			width: 150,
			...getColumnSearchProps('author'),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			width: 120,
			filters: [
				{ text: 'Approved', value: 'approved' },
				{ text: 'Pending', value: 'pending' },
				{ text: 'Rejected', value: 'rejected' },
			],
			onFilter: (value, record) => record.status === value,
			render: (status: Story['status']) => {
				const statusColors: Record<Story['status'], string> = {
					approved: 'green',
					pending: 'orange',
					rejected: 'red',
				};
				return <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>;
			},
		},
		{
			title: 'Ngày đăng',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 150,
			sorter: (a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
		},
		{
			title: 'Hành động',
			key: 'action',
			width: 220,
			render: (_, record) => (
				<Space>
					{record.status === 'pending' && (
						<>
							<Button
								type="primary"
								size="small"
								onClick={() =>
									navigate(
										RoutePaths.APPROVE_STORY.replace(
											`:${PathHolders.STORY_ID}`,
											String(record.id),
										),
									)
								}
							>
								Xem duyệt
							</Button>
							<Button
								danger
								size="small"
								onClick={() => handleReject(record.id)}
							>
								Từ chối
							</Button>
						</>
					)}
					<Popconfirm
						title="Xoá truyện?"
						onConfirm={() => handleDelete(record.id)}
					>
						<Button danger size="small">
							Xoá
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 10 }}>
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
					Quản lý câu chuyện người dùng
				</Title>

				<Table<Story>
					rowKey="id"
					columns={columns}
					dataSource={stories}
					scroll={{ x: 'max-content' }}
					pagination={{ responsive: true }}
					bordered
				/>
			</ConfigProvider>
		</div>
	);
};

export default StoryManagementPage;
