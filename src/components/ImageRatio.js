import { Box } from "@mui/material";

export default function ImageRatio({
  src,
  ratio = "4 * 4",
  onClick = () => {},
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingTop: `calc(100% / ${ratio})`,
        background: (theme) => theme.palette.grey[300],
      }}
      onClick={onClick}
    >
      {src && (
        <img
          src={src}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </Box>
  );
}
