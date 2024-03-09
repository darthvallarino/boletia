import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ImageRatio from "../ImageRatio";

const ImageUploader = ({ id, ratio = "4 * 4", value, onChange = () => {} }) => {
  const [imageSrc, setImageSrc] = useState(value);

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
    document.getElementById(id).click();
  };

  useEffect(() => {
    onChange(imageSrc);
  }, [imageSrc]);

  return (
    <Box sx={{ width: "100%" }}>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <ImageRatio src={imageSrc} ratio={ratio} onClick={handleButtonClick} />
    </Box>
  );
};

export default ImageUploader;
