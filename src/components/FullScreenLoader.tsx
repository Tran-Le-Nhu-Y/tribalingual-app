import React from 'react';
import LoadingScreen from './LoadingScreen';

const FullScreenLoader: React.FC = () => {
	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 9999,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'rgba(255,255,255,0.6)',
				backdropFilter: 'blur(6px)',
			}}
		>
			<LoadingScreen />
		</div>
	);
};

export default FullScreenLoader;
