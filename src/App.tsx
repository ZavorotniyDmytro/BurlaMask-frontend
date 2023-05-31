import React from 'react';
import Image from './components/Image';
import ImageUploader from './components/ImageUpload';

const App = () => {
  return (
    <div>
      <Image width='200px' height='200px'>
			<ImageUploader/>
		</Image>
    //</div>
  );
};

export default App;
