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
	App,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { appTheme } from '../../theme/theme';
import {
	useCreateGenre,
	useDeleteGenre,
	useGetGenres,
	useUpdateGenre,
} from '../../service';
import { useTranslation } from 'react-i18next';
import { DeleteError } from '../../util/errors';
import type { Genre } from '../../@types/entities';
import type {
	CreateGenreRequest,
	UpdateGenreRequest,
} from '../../@types/requests';

const { Title } = Typography;

const GenreManagementPage: React.FC = () => {
	const { t } = useTranslation('standard');
	const { notification } = App.useApp();
	const [openModal, setOpenModal] = useState(false);
	const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
	const [form] = Form.useForm();

	const columns = [
		{
			title: t('genreName'),
			dataIndex: 'name',
			key: 'name',
			width: '20%',
			render: (text: string) => <strong>{text}</strong>,
		},
		{
			title: t('description'),
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
		},
		{
			title: t('action'),
			key: 'action',
			width: '20%',
			render: (genre: Genre) => (
				<Space>
					<Button
						type="primary"
						size="small"
						onClick={() => handleUpdate(genre)}
					>
						{t('update')}
					</Button>
					<Popconfirm
						title={t('genreDeleteConfirm')}
						cancelText={t('cancel')}
						okText={t('submit')}
						okType="danger"
						onConfirm={() => handleDelete(genre.id)}
					>
						<Button danger size="small">
							{t('delete')}
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
				message: t('dataLoadingError'),
				description: t('genreLoadingErrorDescription'),
				placement: 'topRight',
			});
		}
	}, [genres.data, genres.isError, notification, t]);

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

	// delete genre
	const [deleteGenreTrigger, { isLoading: isDeleting }] = useDeleteGenre();
	const handleDelete = async (id: string) => {
		try {
			await deleteGenreTrigger(id).unwrap();
			notification.success({
				message: t('deleteGenreSuccess'),
				placement: 'topRight',
			});
			setGenresQuery((prev) => ({ ...prev }));
		} catch (error) {
			switch (error) {
				case DeleteError.NOT_FOUND: {
					notification.error({
						message: t('genreDeleteError'),
						description: t('genreNotFound'),
						placement: 'topRight',
					});
					break;
				}
				case DeleteError.UNKNOWN_ERROR: {
					notification.error({
						message: t('genreDeleteError'),
						placement: 'topRight',
					});
					break;
				}
			}
		}
	};

	const handleAdd = () => {
		setEditingGenre(null);
		form.resetFields();
		setOpenModal(true);
	};

	const handleUpdate = (genre: Genre) => {
		setEditingGenre(genre);
		form.setFieldsValue(genre);
		setOpenModal(true);
	};

	const [createGenreTrigger, { isLoading: isCreating }] = useCreateGenre();
	const [updateGenreTrigger, { isLoading: isUpdating }] = useUpdateGenre();
	const handleSave = async () => {
		try {
			const values = (await form.validateFields()) as CreateGenreRequest;
			if (editingGenre) {
				// update
				const payload: UpdateGenreRequest = {
					id: editingGenre.id,
					...values,
				};
				await updateGenreTrigger(payload).unwrap();
				notification.success({ message: t('updateGenreSuccess') });
			} else {
				// create
				const payload: CreateGenreRequest = values;
				await createGenreTrigger(payload).unwrap();
				notification.success({ message: t('addGenreSuccess') });
			}
			setOpenModal(false);
		} catch (error) {
			notification.error({
				message: editingGenre ? t('updateGenreFailed') : t('addGenreFailed'),
			});
			console.log('Error: ', error);
		}
	};

	return (
		<>
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
					<Space
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
							{t('genreManagement')}
						</Title>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => handleAdd()}
							style={{ borderRadius: 8 }}
						>
							{t('addGenre')}
						</Button>
					</Space>

					<Table
						rowKey="id"
						loading={genres.isLoading || isDeleting || isCreating || isUpdating}
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
					title={editingGenre ? t('updateGenre') : t('addGenre')}
					open={openModal}
					onOk={() => handleSave()}
					onCancel={() => setOpenModal(false)}
					okText={t('save')}
					cancelText={t('cancel')}
					centered
				>
					<Form form={form} layout="vertical">
						<Form.Item
							label={t('genreName')}
							name="name"
							rules={[{ required: true, message: t('genreNameRequired') }]}
						>
							<Input placeholder={t('enterGenreName')} />
						</Form.Item>
						<Form.Item label={t('description')} name="description">
							<Input.TextArea rows={3} placeholder={t('enterDescription')} />
						</Form.Item>
					</Form>
				</Modal>
			</ConfigProvider>
		</>
	);
};

export default GenreManagementPage;
