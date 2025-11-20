import { Button, Card, Typography } from 'antd';
import { useAuthz } from '../../contexts/authz';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
	const { isAuthenticated, loginWithRedirect } = useAuthz();

	return (
		<div
			style={{
				minHeight: '100vh',
				width: '100%',
				background: '#E6F4FF',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 24,
			}}
		>
			<Card
				style={{
					maxWidth: 800,
					width: '100%',
					borderRadius: 16,
					textAlign: 'center',
					padding: '40px 30px',
					boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
				}}
			>
				<Title level={2} style={{ fontWeight: 700 }}>
					When a language disappears, a culture fades away
				</Title>

				<Paragraph style={{ fontSize: 16, lineHeight: 1.7 }}>
					TRIbLINGUAL is a project founded in September 2025 to preserve,
					document, and celebrate the Hmong language and culture through
					storytelling, education, and community collaboration.
				</Paragraph>

				<Paragraph style={{ fontSize: 16, lineHeight: 1.7 }}>
					Supported by the National University of Singapore (NUS) under the
					Asian Undergraduate Symposium (AUS), this project represents the power
					of youth-led innovation for cultural sustainability.
				</Paragraph>

				{!isAuthenticated && (
					<Button
						type="primary"
						size="large"
						shape="round"
						style={{ marginTop: 20, padding: '0 40px' }}
						onClick={() => loginWithRedirect()}
					>
						Login
					</Button>
				)}
			</Card>
		</div>
	);
};

export default LandingPage;
