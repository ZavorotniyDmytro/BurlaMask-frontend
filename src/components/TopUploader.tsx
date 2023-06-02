import React from 'react';
import ImageUploader from './ImageUpload';

const TopUploader = () => {
	return (
		<div style={topUploaderStyles}>
			<ImageUploader/>
			<ImageUploader/>
		</div>
	);
};

const topUploaderStyles: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-around',
	marginBottom: '20px',
};

export default TopUploader;