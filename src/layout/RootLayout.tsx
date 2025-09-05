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
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
	ConfigProvider,
	Layout,
	Menu,
	Avatar,
	Input,
	theme,
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

const items: MenuProps['items'] = [
	{ key: '1', icon: <HomeOutlined />, label: 'Trang chủ' },
	{ key: '2', icon: <BookOutlined />, label: 'Sách yêu thích' },
	{ key: '3', icon: <UserOutlined />, label: 'Tài khoản' },
	{ key: '4', icon: <LogoutOutlined />, label: 'Đăng xuất' },
];

const RootLayout = () => {
	const { t } = useTranslation('standard');
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

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
				navigate(RoutePaths.FAVORITEBOOK);
				break;
			case '3':
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
					},
					components: {
						Menu: {
							itemBorderRadius: 8,
							itemHeight: 42,
							colorItemText: '#333',
							colorItemTextHover: '#333',
							colorItemTextSelected: '#333',
							colorItemBgHover: '#e6f7ff',
							colorItemBgSelected: '#fff6e0',
						},
						Layout: {
							headerBg: '#ffffff',
							siderBg: '#cfe9ff',
							footerBg: '#fafafa',
						},
					},
				}}
			>
				<Layout style={{ minHeight: '100vh' }}>
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
						title="TribalLingual"
						placement="left"
						onClose={() => setDrawerVisible(false)}
						open={drawerVisible}
						bodyStyle={{ padding: 5 }}
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
								background: colorBgContainer,
								boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
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
								margin: '8px',
								overflow: 'auto',
							}}
						>
							<div
								style={{
									padding: 24,
									textAlign: 'center',
									background: colorBgContainer,
									borderRadius: borderRadiusLG,
									minHeight: 'calc(100vh - 180px)',
								}}
							>
								<Outlet />
							</div>
						</Content>

						<Footer
							style={{
								textAlign: 'center',
								background: '#fafafa',
								padding: '20px',
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
								<div style={{ display: 'flex', gap: 24, fontSize: 22 }}>
									<a
										href="https://www.instagram.com/"
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: '#E1306C' }}
									>
										<InstagramOutlined />
									</a>
									<a
										href="https://www.facebook.com/"
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: '#1877F2' }}
									>
										<FacebookOutlined />
									</a>
									<a
										href="mailto:team@triballingual.com"
										style={{ color: '#EA4335' }}
									>
										<MailOutlined />
									</a>
								</div>

								{/* Copyright */}
								<div style={{ fontSize: 13, color: '#999' }}>
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
