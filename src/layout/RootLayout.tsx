import { useState } from 'react';
import {
	HomeOutlined,
	BookOutlined,
	UserOutlined,
	LogoutOutlined,
	BellOutlined,
	FacebookOutlined,
	InstagramOutlined,
	MailOutlined,
	UnorderedListOutlined,
	HeartOutlined,
	FormOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
	ConfigProvider,
	Layout,
	Menu,
	Avatar,
	Input,
	Grid,
	Button,
	Drawer,
	Tooltip,
	Badge,
	Dropdown,
} from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { RoutePaths } from '../util';
import { useTranslation } from 'react-i18next';
import { appComponents, appTheme } from '../theme/theme';

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

const RootLayout = () => {
	const { t } = useTranslation('standard');
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	const items: MenuProps['items'] = [
		{ key: RoutePaths.HOME, icon: <HomeOutlined />, label: t('homePage') },
		{
			key: RoutePaths.UPLOADSTORY,
			icon: <FormOutlined />,
			label: t('uploadStory'),
		},
		{
			key: RoutePaths.BOOKSTORAGE,
			icon: <BookOutlined />,
			label: t('bookStorage'),
		},
		{
			key: RoutePaths.FAVORITEBOOK,
			icon: <HeartOutlined />,
			label: t('favorite'),
		},
		{ key: RoutePaths.PROFILE, icon: <UserOutlined />, label: t('account') },
		{
			key: RoutePaths.BOOKDETAIL,
			icon: <LogoutOutlined />,
			label: t('logout'),
		},
		{
			key: RoutePaths.ADMIN,
			icon: <LogoutOutlined />,
			label: 'Admin',
		},
		{
			key: RoutePaths.GENRE,
			icon: <LogoutOutlined />,
			label: 'Genre',
		},
	];

	const selectedKey = pathname.startsWith(RoutePaths.ADMIN)
		? RoutePaths.ADMIN
		: items?.some((item) => item?.key === pathname)
		? pathname
		: RoutePaths.HOME;

	const screens = useBreakpoint();
	const [drawerVisible, setDrawerVisible] = useState(false);

	const isMobile = screens.xs;
	const isTablet = screens.sm && !screens.md;

	const onMenuClick: MenuProps['onClick'] = (e) => {
		if (e.key === 'logout') {
			console.log('Đăng xuất');
			return;
		}
		navigate(e.key);
		if (isMobile || isTablet) {
			setDrawerVisible(false); // đóng Drawer khi chọn menu
		}
	};

	const renderSiderMenu = (collapsed: boolean) => (
		<Menu
			mode="inline"
			selectedKeys={[selectedKey]}
			onClick={onMenuClick}
			items={items}
			style={{
				width: '100%',
				borderInlineEnd: 'none',
				flex: 1,
				background: 'transparent',
			}}
			inlineCollapsed={collapsed}
		/>
	);

	const [notificationCount, setNotificationCount] = useState(3);

	return (
		<>
			<style>
				{`
				html, body, #root {
					margin: 0;
					padding: 0;
					height: 100%;
				}

				.ant-menu-item {
					transition: transform 0.25s ease, box-shadow 0.25s ease;
				}

				.ant-menu-item:hover {
					transform: scale(1.05); 
					box-shadow: 0 4px 12px rgba(0,0,0,0.08); 
					border-radius: 8px; 
					z-index: 1; 
				}

				.ant-menu-item:active {
					transform: scale(0.97);
				}
        `}
			</style>

			<ConfigProvider
				theme={{
					token: appTheme.token,
					components: appComponents,
				}}
			>
				<Layout
					style={{
						minHeight: '100vh',
					}}
				>
					{/* --- Sider (Tablet + Desktop) --- */}
					{!isMobile && (
						<Sider
							width={240}
							collapsed={isTablet}
							collapsedWidth={isTablet ? 80 : 240}
							style={{
								height: '100vh',
								position: 'sticky',
								top: 0,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								padding: '20px 10px',
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									marginBottom: 10,
									fontSize: 20,
									fontWeight: 'bold',
									color: '#ff9800',
									textAlign: 'center',
								}}
							>
								<img
									src="./tribalingual_logo_removebg.png"
									alt="Logo"
									style={{
										width: 100,
										backgroundColor: '#fff', // nền trắng
										borderRadius: '50%', // bo tròn thành hình tròn
									}}
								/>
							</div>

							{renderSiderMenu(isTablet!)}
						</Sider>
					)}

					{/* --- Drawer cho Mobile & Tablet full menu --- */}
					<Drawer
						title={
							<div
								style={{ color: '#ff9800', fontWeight: 'bold', fontSize: 20 }}
							>
								TribalLingual
							</div>
						}
						placement="left"
						onClose={() => setDrawerVisible(false)}
						open={drawerVisible}
						style={{
							backgroundColor: '#146C94',
							color: '#F6F1F1',
							padding: 5,
						}}
					>
						{renderSiderMenu(false)}
					</Drawer>

					<Layout>
						<Header
							style={{
								position: 'sticky',
								top: 0,
								zIndex: 1000,
								padding: '0 20px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								backdropFilter: 'blur(20px)',
								boxShadow: '0 5px 8px rgba(2, 2, 2, 0.1)',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
								{(isMobile || isTablet) && (
									<Button
										type="text"
										icon={<UnorderedListOutlined />}
										onClick={() => setDrawerVisible(true)}
									/>
								)}
								<Input.Search
									placeholder="Tìm kiếm..."
									style={{ width: 300 }}
								/>
							</div>

							<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
								<Tooltip title={t('notifications')}>
									<Badge
										count={notificationCount}
										size="small"
										offset={[-2, 2]}
									>
										<BellOutlined
											style={{
												fontSize: 24,
												color: '#474541ff',
												cursor: 'pointer',
											}}
											onClick={() => setNotificationCount(0)}
										/>
									</Badge>
								</Tooltip>

								<Dropdown
									menu={{
										items: [
											{
												key: '1',
												label: t('account'),
												icon: <UserOutlined />,
												onClick: () => navigate(RoutePaths.PROFILE),
											},
											{
												key: '2',
												label: t('editInformation'),
												icon: <FormOutlined />,
												onClick: () => {
													console.log('Chỉnh sửa thông tin');
												},
											},
											{
												type: 'divider',
											},
											{
												key: '3',
												label: t('logout'),
												icon: <LogoutOutlined />,
												danger: true,
												onClick: () => {
													console.log('Đăng xuất');
												},
											},
										],
									}}
									trigger={['click']}
									placement="bottomRight"
								>
									<Avatar
										style={{ backgroundColor: '#ff9800', cursor: 'pointer' }}
										icon={<UserOutlined />}
									/>
								</Dropdown>
							</div>
						</Header>

						<Content
							style={{
								overflow: 'auto',
							}}
						>
							<div
								style={{
									padding: 18,
									textAlign: 'center',
									background: '#AFD3E2',
									minHeight: 'calc(100vh - 163px)',
									height: '100%',
								}}
							>
								<Outlet />
							</div>
						</Content>

						<Footer
							style={{
								textAlign: 'center',
								padding: '15px ',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 8,
								}}
							>
								{/* Social icons */}
								<div style={{ display: 'flex', gap: 24, fontSize: 24 }}>
									<a
										href="https://www.instagram.com/tribalingual_/?igsh=MXRzaWphODE3MGlleQ%3D%3D&utm_source=qr"
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: '#ff0357ff' }}
									>
										<InstagramOutlined />
									</a>
									<a
										href="https://www.facebook.com/profile.php?id=61580547721780"
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: '#0026ffff' }}
									>
										<FacebookOutlined />
									</a>
									<a
										href="mailto:tribalingual33@gmail.com
"
										style={{ color: '#ff1500ff' }}
									>
										<MailOutlined />
									</a>
								</div>

								{/* Copyright */}
								<div style={{ fontSize: 13, color: '#ebe6e6ff' }}>
									TribalLingual ©{new Date().getFullYear()}
								</div>
							</div>
						</Footer>
					</Layout>
				</Layout>
			</ConfigProvider>
		</>
	);
};

export default RootLayout;
