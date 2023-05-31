import React from 'react';
import ImageUploader from './components/ImageUpload';
import logo from './logo.png'
import Header from './components/Header';
const App: React.FC = () => {
  	return (
		<div className="App">
			<Header logo={logo} />		
		</div>
  	);
};

export default App;
