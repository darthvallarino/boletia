"use client";
import { Box, Stack, Container, Typography } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import useEvents from "@/app/events/useEvents";
import ImageRatio from "@/components/ImageRatio";

export default function Home() {
  const { events } = useEvents();

  return (
    <Container>
      <Stack spacing={2} direction="row">
        <Typography variant="h5">Boletia</Typography>
      </Stack>
      <Box>
        {events && (
          <Carousel autoPlay showIndicators={false} showStatus={false} infiniteLoop>
            {events.map(({ id, name, imgDesktop }) => (
              <Box key={id} component={"div"}>
                <ImageRatio ratio="2340 * 700" src={imgDesktop} />
                <p className="legend">{name}</p>
              </Box>
            ))}
          </Carousel>
        )}
      </Box>

      <Box sx={{width: "66%"}}>
        {events && (
          <Carousel autoPlay showIndicators={false} showStatus={false} infiniteLoop>
            {events.map(({ id, name, imgTablet }) => (
              <Box key={id} component={"div"}>
                <ImageRatio ratio="1440 * 1080" src={imgTablet} />
                <p className="legend">{name}</p>
              </Box>
            ))}
          </Carousel>
        )}
      </Box>

      <Box sx={{width: "33%"}}>
        {events && (
          <Carousel autoPlay showIndicators={false} showStatus={false} infiniteLoop>
            {events.map(({ id, name, imgMobile }) => (
              <Box key={id} component={"div"}>
                <ImageRatio ratio="1920 * 1080" src={imgMobile} />
                <p className="legend">{name}</p>
              </Box>
            ))}
          </Carousel>
        )}
      </Box>
    </Container>
  );
}
