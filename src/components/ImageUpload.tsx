import React, { useState } from "react";

interface ImageUploaderProps {
  // пропсы компонента, если они есть
}

const ImageUploader: React.FC<ImageUploaderProps> = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  const imageUploaderStyles: React.CSSProperties = {
    width: "250px",
    height: "250px",
    border: "1px solid #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

	const imageStyles: React.CSSProperties = {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	};

  const removeButtonStyles: React.CSSProperties = {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "#fff",
    border: "none",
    color: "red",
    fontSize: "20px",
    padding: "0",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const uploadButtonStyles: React.CSSProperties = {
    background: "#fff",
    border: "1px dashed #ccc",
    color: "#ccc",
    fontSize: "14px",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div
      className="image-uploader"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={imageUploaderStyles}
    >
      <div className="image-container">
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Загруженное изображение"
            style={imageStyles}
          />
        )}
        {isHovered && image && (
          <button
            className="remove-button"
            onClick={handleRemoveImage}
            style={removeButtonStyles}
          >
            &times;
          </button>
        )}
      </div>

      {!image && (
        <>
          <label htmlFor="file-input">
            <button
              className="upload-button"
              onClick={handleUploadClick}
              style={uploadButtonStyles}
            >
              Upload
            </button>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
  );
};

export default ImageUploader;