import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('image-input').click();
  };

  useEffect(() => {
    console.log(imageSrc);
  }, [imageSrc])

  return (
    <Box>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button variant="contained" onClick={handleButtonClick}>
        Cargar archivo
      </Button>
    </Box>
  );
};

export default ImageUploader;
