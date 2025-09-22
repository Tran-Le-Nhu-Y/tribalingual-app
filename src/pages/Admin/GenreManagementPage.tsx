import React, { useEffect, useMemo, useState } from 'react';
import {
	Table,
	Button,
	Modal,
	Form,
	Input,
	Popconfirm,
	Space,
	ConfigProvider,
	Card,
	Typography,
	notification,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { appTheme } from '../../theme/theme';
import { useGetGenres } from '../../service';

const { Title } = Typography;

const GenreManagementPage: React.FC = () => {
	const [loading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	// const [editingGenre, setEditingGenre] = useState<Genre | null>(null);

	const [form] = Form.useForm();

	// const handleAdd = () => {
	// 	setEditingGenre(null);
	// 	form.resetFields();
	// 	setOpenModal(true);
	// };

	// const handleEdit = (record: Genre) => {
	// 	setEditingGenre(record);
	// 	form.setFieldsValue(record);
	// 	setOpenModal(true);
	// };

	// const handleDelete = (id: string) => {
	// 	setGenres((prev) => prev.filter((g) => g.id !== id));
	// };

	// const handleSave = () => {
	// 	form
	// 		.validateFields()
	// 		.then((values) => {
	// 			if (editingGenre) {
	// 				// update
	// 				setGenres((prev) =>
	// 					prev.map((g) =>
	// 						g.id === editingGenre.id ? { ...editingGenre, ...values } : g,
	// 					),
	// 				);
	// 			} else {
	// 				// create
	// 				const newGenre: Genre = {
	// 					id: Date.now().toString(),
	// 					...values,
	// 				};
	// 				setGenres((prev) => [...prev, newGenre]);
	// 			}
	// 			setOpenModal(false);
	// 		})
	// 		.catch((info) => {
	// 			console.log('Validate Failed:', info);
	// 		});
	// };

	const columns = [
		{
			title: 'Tên thể loại',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
			render: (text: string) => <strong>{text}</strong>,
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
		},
		{
			title: 'Hành động',
			key: 'action',
			width: '20%',
			render: () => (
				<Space>
					<Button type="primary" size="small" onClick={() => {}}>
						Cập nhật
					</Button>
					<Popconfirm
						title="Bạn có chắc chắn muốn xóa thể loại này?"
						onConfirm={() => {}}
					>
						<Button danger size="small">
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	//Get all genre
	const [genresQuery, setGenresQuery] = useState<GetQuery>({
		offset: 0,
		limit: 5, //  5 item
	});
	const genres = useGetGenres(genresQuery!, {
		skip: !genresQuery,
	});
	useEffect(() => {
		if (genres.isError) {
			notification.error({
				message: 'Lỗi tải dữ liệu',
				description: 'Không thể tải danh sách thể loại. Vui lòng thử lại.',
				placement: 'topRight',
			});
		}
	}, [genres.data, genres.isError]);

	const content = useMemo(() => {
		if (genres.isError) return [];
		if (genres.data?.content)
			return genres.data.content.map(
				(genre) =>
					({
						...genre,
						id: genre.id,
					} as Genre),
			);
		else return [];
	}, [genres.data?.content, genres.isError]);

	return (
		<div style={{ padding: 10 }}>
			<ConfigProvider
				theme={{
					token: appTheme.token,
				}}
			>
				<Card
					style={{
						borderRadius: 12,
						boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
						height: '70vh',
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 20,
						}}
					>
						<Title
							level={3}
							style={{
								margin: 0,
								fontSize: 24,
								fontWeight: 700,
								color: appTheme.token.colorPrimary,
							}}
						>
							Quản lý thể loại truyện
						</Title>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => {}}
							style={{ borderRadius: 8 }}
						>
							Thêm thể loại
						</Button>
					</div>

					<Table
						rowKey="id"
						loading={loading}
						columns={columns}
						dataSource={content}
						pagination={{
							current: (genres.data?.page_number ?? 0) + 1,
							pageSize: genres.data?.page_size ?? 5,
							total: genres.data?.total_elements ?? 0,
							onChange: (page, pageSize) => {
								setGenresQuery({
									offset: (page - 1) * pageSize,
									limit: pageSize,
								});
							},
						}}
						bordered
					/>
				</Card>

				<Modal
					// title={editingGenre ? 'Cập nhật thể loại' : 'Thêm thể loại'}
					open={openModal}
					onOk={() => {}}
					onCancel={() => setOpenModal(false)}
					okText="Lưu"
					cancelText="Hủy"
					centered
				>
					<Form form={form} layout="vertical">
						<Form.Item
							label="Tên thể loại"
							name="name"
							rules={[
								{ required: true, message: 'Vui lòng nhập tên thể loại' },
							]}
						>
							<Input placeholder="Nhập tên thể loại" />
						</Form.Item>
						<Form.Item label="Mô tả" name="description">
							<Input.TextArea rows={3} placeholder="Nhập mô tả" />
						</Form.Item>
					</Form>
				</Modal>
			</ConfigProvider>
		</div>
	);
};

export default GenreManagementPage;
