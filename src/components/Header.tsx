import React, { useState } from 'react';

interface HeaderProps {
	logo: string;
}

interface Image {
	id: string;
	image_url: string
	description: string
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
	const [description, setDescription] = useState('');
	const [images, setImages] = useState<Image[]>([])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};

	const handleButtonClick = () => {		
		const payload = { description: description };
		fetch('http://localhost:3001/images/description', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8', 
			},
			body: JSON.stringify(payload),
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);			
			setImages(data)
		})
		.catch(error => {
			console.log(error);			
		});
	};

  return (
    <header style={headerStyles}>
      <div className="logo" style={logoStyles}>
        <img src={logo} alt="Logo" style={logoImageStyles} />
        <span style={logoTextStyles}>BURLAMASK</span>
      </div>
      <div className="search" style={searchStyles}>
        <input
          type="text"
          placeholder="Search"
          style={searchInputStyles}
          value={description}
          onChange={handleInputChange}
        />
        <button style={buttonStyles} onClick={handleButtonClick}>
          Search
        </button>
      </div>
    </header>
  );
};


const headerStyles: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '10px',
	background: '#f1f1f1',
};

const logoStyles: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
};

const logoImageStyles: React.CSSProperties = {
	width: '40px',
	height: '40px',
	marginRight: '10px',
};

const logoTextStyles: React.CSSProperties = {
	fontSize: '18px',
	fontWeight: 'bold',
};

const searchStyles: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
};

const searchInputStyles: React.CSSProperties = {
	padding: '5px',
	marginRight: '10px',
};

const buttonStyles: React.CSSProperties = {
	padding: '5px 10px',
	background: 'blue',
	color: 'white',
	border: 'none',
	borderRadius: '4px',
 };
 
 export default Header;