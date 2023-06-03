import React from 'react';
import logo from './logo.jpg'
import Header from './components/Header';
import Body from './components/Body';
const App: React.FC = () => {
  	return (
		<div className="App">
			<Header logo={logo} />
			<Body/>
		</div>
  	);
};


export default App;
