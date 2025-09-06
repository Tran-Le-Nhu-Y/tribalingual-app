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
} from 'antd';
import { Outlet, useNavigate } from 'react-router';
import { RoutePaths } from '../util';
import { useTranslation } from 'react-i18next';

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

const RootLayout = () => {
	const { t } = useTranslation('standard');

	const items: MenuProps['items'] = [
		{ key: '1', icon: <HomeOutlined />, label: t('homePage') },
		{ key: '2', icon: <BookOutlined />, label: t('bookStorage') },
		{ key: '3', icon: <HeartOutlined />, label: t('favorite') },
		{ key: '4', icon: <UserOutlined />, label: t('account') },
		{ key: '5', icon: <LogoutOutlined />, label: t('logout') },
	];
	const screens = useBreakpoint();
	const [drawerVisible, setDrawerVisible] = useState(false);
	const navigate = useNavigate();

	const isMobile = screens.xs;
	const isTablet = screens.sm && !screens.md;

	const onMenuClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case '1':
				navigate(RoutePaths.HOME);
				break;
			case '2':
				navigate(RoutePaths.BOOKSTORAGE);
				break;
			case '3':
				navigate(RoutePaths.FAVORITEBOOK);
				break;
			case '4':
				navigate(RoutePaths.PROFILE);
				break;
			default:
				break;
		}
		if (isMobile || isTablet) {
			setDrawerVisible(false); // đóng Drawer khi chọn menu
		}
	};

	const renderSiderMenu = (collapsed: boolean) => (
		<Menu
			mode="inline"
			defaultSelectedKeys={['1']}
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
					token: {
						colorPrimary: '#3396D3',
						colorBgContainer: '#f9fbff',
						borderRadiusLG: 12,
						fontFamily: 'Arial, sans-serif',
						fontSize: 14,
					},
					components: {
						Menu: {
							itemBorderRadius: 8,
							itemHeight: 42,
							colorItemText: '#F6F1F1',
							colorItemTextHover: '#333',
							colorItemTextSelected: '#333',
							colorItemBgHover: '#b5d9f8ff',
							colorItemBgSelected: '#F6F1F1',
						},
						Layout: {
							headerBg: '#AFD3E2',
							siderBg: 'linear-gradient(180deg, #146C94,#03506F )',
							footerBg: 'linear-gradient(180deg, #AFD3E2,#03506F )',
						},
					},
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
									marginBottom: 30,
									fontSize: 20,
									fontWeight: 'bold',
									color: '#ff9800',
									textAlign: 'center',
								}}
							>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
									alt="Logo"
									style={{ width: 50, marginBottom: 10 }}
								/>
								{!isTablet && <div>TribalLingual</div>}
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

								<Avatar
									style={{ backgroundColor: '#ff9800' }}
									icon={<UserOutlined />}
								/>
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
										href="https://www.instagram.com/"
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: '#ff0357ff' }}
									>
										<InstagramOutlined />
									</a>
									<a
										href="https://www.facebook.com/"
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: '#0026ffff' }}
									>
										<FacebookOutlined />
									</a>
									<a
										href="mailto:team@triballingual.com"
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
