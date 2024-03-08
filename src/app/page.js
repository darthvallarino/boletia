"use client"
import { Stack, Container, Typography } from "@mui/material";
import ImageLoader from "@/components/Inputs/ImageLoader";
import BannerForm from "@/components/Forms/BannerForm";

export default function Home() {
  return (
    <Container>
      <Stack spacing={2} direction="row">
        <Typography variant="h5">Boletia</Typography>
      </Stack>
      <BannerForm></BannerForm>
    </Container>
  );
}
