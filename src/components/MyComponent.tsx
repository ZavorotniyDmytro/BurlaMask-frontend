import axios from "axios";
import React, { useState } from "react";
import copy from 'clipboard-copy';

interface ImageData {
	id: string;
	image_url: string;
	description: string;
 }
 
 interface SwapImagesResponse {
	swappedImages: ImageData[];
 }

 interface MulterFile {
	fieldname?: string,
	originalname: string,
	encoding: string,
	mimetype: string,
	buffer: Buffer,
	size: number
 };

const MyComponent: React.FC = () => {
	const [image1, setImage1] = useState<File | null>(null);
	const [image2, setImage2] = useState<File | null>(null);
	const [swappedImages, setSwappedImages] = useState<Blob[]>([]);
	const [description1, setDescription1] = useState('');
	const [description2, setDescription2] = useState('');
	const [images, setImages] = useState<File[]>([])
	const [imagesData, setImagesData] = useState<ImageData[]>([])
 
	const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
	  if (e.target.files && e.target.files.length > 0) {
		 setImage1(e.target.files[0]);
	  }
	};
 
	const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
	  if (e.target.files && e.target.files.length > 0) {
		 setImage2(e.target.files[0]);
	  }
	};
 
	const handleSwapClick = async () => {
	  if (image1 && image2) {
		 const formData = new FormData();
		 formData.append('images', image1);
		 formData.append('images', image2);		
		 try {
			const response: any = await axios.post<SwapImagesResponse>(
			  'http://localhost:3001/images/swap',
			  formData,
			  {
				 headers: {
					'Content-Type': 'multipart/form-data',
					'Access-Control-Allow-Origin': 'http://localhost:3000',
				 },
			  }
			);
			
			setImages(response.data.images);
			setImagesData(response.data.imagesData)
			
			
			const reader1 = new FileReader();
			const reader2 = new FileReader();
 
			reader1.onload = () => {
			  const url1 = reader1.result as string;
			  const swappedImage1: Blob = new Blob(
				[new Uint8Array(response.data.images[0].buffer.data)],
				{ type: response.data.images[0].mimetype }
				)
 
			  reader2.onload = () => {
				 const url2 = reader2.result as string;
				 const swappedImage2 = new Blob(
					[new Uint8Array(response.data.images[1].buffer.data)],
					{ type: response.data.images[1].mimetype }
					)
 
				 setSwappedImages([swappedImage1, swappedImage2]);
			  };
 
			  reader2.readAsDataURL(image2);
			};
 
			reader1.readAsDataURL(image1);
		 } catch (error) {
			console.error('Error swapping images:', error);
		 }
	  }
	};
 
	const handleSaveClick1 = async () => {
	  if (swappedImages.length > 0 && description1 !== '') {
		 const formData = new FormData();	 
		 formData.append('id', imagesData[0].id);
		 formData.append('description', description1);
 
		 try {
			const response: any = await axios.post(
				'http://localhost:3001/images/upload', 
				formData,
				{
				  headers: {
					'Content-type': 'application/json; charset=UTF-8',
					 'Access-Control-Allow-Origin': 'http://localhost:3000',
				  },
				}
			);
			copy(response.data);
			console.log('SAVED1');
		 } catch (error) {
			console.error('Error uploading image:', error);
		 }
	  }
	};

	const handleSaveClick2 = async () => {
		if (swappedImages.length > 0 && description2 !== '') {
		  const formData = new FormData();		  
		  formData.append('id', imagesData[1].id);
		  formData.append('description', description2);
  
		  try {
			const response: any = await axios.post(
				'http://localhost:3001/images/upload', 
				formData,
				{
				  headers: {
						'Content-type': 'application/json; charset=UTF-8',
					 'Access-Control-Allow-Origin': 'http://localhost:3000',
				  },
				}
			);
			copy(response.data);
			console.log('SAVED2');			
		  } catch (error) {
			 console.error('Error uploading image:', error);
		  }
		}
	 };
 
	const imageButtonStyle: React.CSSProperties = {
	  backgroundColor: '#fca311',
	  color: '#fff',
	  padding: '10px 20px',
	  border: 'none',
	  cursor: 'pointer',
	  fontWeight: 'bold'
	};
 
	const imageContainerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',		
	  	height: '100%'
	 };
 
	const imagePreviewStyle: React.CSSProperties = {
		width: '200px',
		height: '200px',
		objectFit: 'cover',
		marginBottom: '10px',
	};
 
	const saveButtonStyle: React.CSSProperties = {
	  backgroundColor: '#4CAF50',
	  color: '#fff',
	  padding: '10px 20px',
	  border: 'none',
	  cursor: 'pointer',
	  fontWeight: 'bold',
	};


 
	return (
	  <div style={{columnCount: 1}}>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<div style={imageContainerStyle}>
					{image1 && <img style={imagePreviewStyle} src={URL.createObjectURL(image1)} alt="Image 1" />}
					<div>
						<label htmlFor="image1-upload" style={imageButtonStyle}>
							{image1 ? 'Change Image 1' : 'Upload Image 1'}
						</label>
						<input
							id="image1-upload"
							type="file"
							accept="image/*"
							onChange={handleImage1Change}
							style={{ display: 'none' }}
						/>
					</div>
				</div>
				<div>
					<button style={{
						backgroundColor: '#fca311',
						color: '#fff',
						padding: '10px 20px',
						border: 'none',
						cursor: 'pointer',
						fontWeight: 'bold'
						}} onClick={handleSwapClick}>
					Swap
					</button>
				</div>
				<div style={imageContainerStyle}>
					{image2 && <img style={imagePreviewStyle} src={URL.createObjectURL(image2)} alt="Image 2" />}
					<label htmlFor="image2-upload" style={imageButtonStyle}>
						{image2 ? 'Change Image 2' : 'Upload Image 2'}
					</label>
					<input
						id="image2-upload"
						type="file"
						accept="image/*"
						onChange={handleImage2Change}
						style={{ display: 'none' }}
					/>
				</div>
			</div>
			<div>			
				{swappedImages.length > 0 && (
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<div>
							<div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
								<img style={imagePreviewStyle} src={imagesData[0].image_url} alt="Swapped Image 1" />
								<input
									type="text"
									value={description1}
									onChange={(e) => setDescription1(e.target.value)}
									placeholder="Enter description"
								/>
								<button style={saveButtonStyle} onClick={handleSaveClick1}>
									Save
								</button>
							</div>
						</div>
						<div>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<img style={imagePreviewStyle} src={imagesData[1].image_url} alt="Swapped Image 2" />
								<input
									type="text"
									value={description2}
									onChange={(e) => setDescription2(e.target.value)}
									placeholder="Enter description"
								/>
								<button style={saveButtonStyle} onClick={handleSaveClick2}>
									Save
								</button>
							</div>
						</div>
					</div>
						
					)}
			</div>			
	  </div>
	);
 };
 
 export default MyComponent;