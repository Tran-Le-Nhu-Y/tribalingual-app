import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {
	RocketOutlined,
	CheckCircleOutlined,
	HeartOutlined,
	TrophyOutlined,
} from '@ant-design/icons';

const HomePage = () => {
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
			<Row gutter={16} style={{ marginTop: '10px' }}>
				{stats.map((item, idx) => (
					<Col span={6} key={idx}>
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
									marginBottom: 8,
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

export default HomePage;
