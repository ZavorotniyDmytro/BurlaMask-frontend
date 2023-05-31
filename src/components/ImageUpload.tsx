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

  return (
    <div
      className="image-uploader"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        {image && (
          <img src={URL.createObjectURL(image)} alt="Загруженное изображение" />
        )}
        {isHovered && image && (
          <button className="remove-button" onClick={handleRemoveImage}>
            &times;
          </button>
        )}
      </div>

      {!image && (
        <>
          <label htmlFor="file-input">
            <button className="upload-button" onClick={handleUploadClick}>
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