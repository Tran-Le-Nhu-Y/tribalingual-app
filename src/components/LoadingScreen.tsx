import { motion } from 'framer-motion';
import { Spin } from 'antd';

const LoadingScreen = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				width: '100%',
				background: 'linear-gradient(135deg, #146C94, #19A7CE)',
				color: '#fff',
				overflow: 'hidden',
			}}
		>
			{/* Logo xoay nhẹ */}
			<motion.div
				initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
				animate={{ rotate: 360, scale: 1, opacity: 1 }}
				transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
				style={{
					borderRadius: '50%',
					border: '4px solid rgba(255,255,255,0.4)',
					padding: 20,
					marginBottom: 24,
				}}
			>
				<img
					src="/tribalingual_logo_removebg.png"
					alt="Logo"
					style={{ width: 80, height: 80 }}
				/>
			</motion.div>

			{/* Text TribalLingual */}
			<motion.h2
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				style={{
					fontSize: '1.8rem',
					fontWeight: 'bold',
					letterSpacing: '2px',
					color: '#F6F1F1',
					marginBottom: 12,
				}}
			>
				TribalLingual
			</motion.h2>

			{/* Vòng xoay Ant Design */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				<Spin size="large" tip="Đang tải..." />
			</motion.div>
		</div>
	);
};

export default LoadingScreen;
