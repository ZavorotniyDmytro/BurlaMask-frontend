import React from 'react';

interface ImageProps {
	width?: string
	height?: string
	children?: React.ReactChild | React.ReactNode
}
const Image = ({width, height, children}: ImageProps) => {
	return (
		<div style={{width, height, background: 'grey'}}>
			{children}
		</div>
	);
};

export default Image;