import React, { useState, useEffect } from "react";
import numeral from "numeral";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ImageRatio from "../ImageRatio";

function DimensionsAlert({ open, handleClose, width, height }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Las dimensiones de su imagen deben ser ${width}x${height}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function MaxSizeAlert({ open, handleClose, maxSize }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`El tamaño de su imagen supera el tamaño permitido ${numeral(
            maxSize
          ).format("0.0 b")}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const ImageUploader = ({
  id,
  ratio = "4 * 4",
  maxSize,
  width,
  height,
  value,
  onChange = () => {},
}) => {
  const [imageSrc, setImageSrc] = useState(value);
  const [openSizeAlert, setOpenSizeAlert] = useState(false);
  const handleCloseSizeAlert = () => {
    setOpenSizeAlert(false);
  };

  const [openDimensionsAlert, setOpenDimensionsAlert] = useState(false);
  const handleCloseDimensionsAlert = () => {
    setOpenDimensionsAlert(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const isDimensionValid = await validateDimensions(reader.result);
      if (isDimensionValid) {
        setImageSrc(reader.result);
      } else {
        setOpenDimensionsAlert(true);
      }
    };
    if (file) {
      if (maxSize) {
        if (file.size <= maxSize) {
          reader.readAsDataURL(file);
        } else {
          setOpenSizeAlert(true);
        }
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleButtonClick = () => {
    document.getElementById(id).click();
  };

  const validateDimensions = (imgUrl) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgUrl;
      img.onload = () => {
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        if (width && height) {
          if (width === imgWidth && height === imgHeight) {
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(true);
        }
      };
    });

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
      <MaxSizeAlert
        open={openSizeAlert}
        handleClose={handleCloseSizeAlert}
        maxSize={maxSize}
      />
      <DimensionsAlert
        open={openDimensionsAlert}
        handleClose={handleCloseDimensionsAlert}
        width={width}
        height={height}
      />
    </Box>
  );
};

export default ImageUploader;
