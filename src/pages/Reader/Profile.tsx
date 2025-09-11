import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {
	RocketOutlined,
	CheckCircleOutlined,
	HeartOutlined,
	TrophyOutlined,
} from '@ant-design/icons';

const ProfilePage = () => {
	const { t } = useTranslation();
	const stats = [
		{
			value: 1,
			label: t('reading'),
			icon: <RocketOutlined style={{ color: '#ff4d4f' }} />,
			bgColor: '#fff1f0',
		},
		{
			value: 10,
			label: t('read'),
			icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
			bgColor: '#f6ffed',
		},
		{
			value: 4,
			label: t('favorite'),
			icon: <HeartOutlined style={{ color: '#ff4d4f' }} />,
			bgColor: '#f0f5ff',
		},
		{
			value: 5,
			label: t('achievements'),
			icon: <TrophyOutlined style={{ color: '#faad14' }} />,
			bgColor: '#fffbe6',
		},
	];

	return (
		<>
			<Row gutter={[16, 16]}>
				{stats.map((item, idx) => (
					<Col
						key={idx}
						xs={12} // mobile: 2 columns
						sm={12} // small tablet: 2 columns
						md={12} // large tablet: 2 columns
						lg={6} // desktop: 4 columns (24/6=4)
					>
						<div
							style={{
								background: '#fff',
								borderRadius: 8,
								padding: '8px',
								textAlign: 'center',
								boxShadow: '0 2px 3px rgba(0,0,0,0.08)',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 8,
								}}
							>
								<div
									style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}
								>
									{item.value}
								</div>
								<span
									style={{
										fontSize: 24,
										background: item.bgColor,
										padding: 6,
										borderRadius: 6,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{item.icon}
								</span>
							</div>

							<div style={{ color: '#555' }}>{item.label}</div>
						</div>
					</Col>
				))}
			</Row>
		</>
	);
};

export default ProfilePage;
