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

  return (
    <div
      className="image-uploader"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!image && (
        <>
          <label htmlFor="file-input">
            <button className="upload-button">Загрузить</button>
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

      {image && (
        <div className="image-container">
          <img src={URL.createObjectURL(image)} alt="Загруженное изображение" />
          {isHovered && (
            <button className="remove-button" onClick={handleRemoveImage}>
              &times;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;