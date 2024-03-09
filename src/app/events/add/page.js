"use client";
import { Stack, Container, Typography } from "@mui/material";
import BannerForm from "@/components/Forms/BannerForm";
import { uuid } from "uuidv4";
import useEvents from "../useEvents";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { addEvent } = useEvents();
  const onSubmit = (data) => {
    addEvent({
      id: uuid(),
      ...data,
    });
    router.push("/events")
  };
  return (
    <Container>
      <Stack spacing={2} direction="row">
        <Typography variant="h5">Agregar Evento</Typography>
      </Stack>
      <BannerForm onSubmit={onSubmit}></BannerForm>
    </Container>
  );
}
