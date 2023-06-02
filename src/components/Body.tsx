import React from 'react';
import MyComponent from './MyComponent';

const Body = () => {
	return (
		<div className="Body" style={bodyStyles}>
			<MyComponent/>
		</div>
	);
};

const bodyStyles: React.CSSProperties = {
	marginTop: '20px',
	marginLeft: '15%',
	marginRight: '15%'
};

export default Body;