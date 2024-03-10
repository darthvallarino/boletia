"use client";
import { Stack, Container, Typography } from "@mui/material";
import BannerForm from "@/components/Forms/BannerForm";
import { uuid } from "uuidv4";
import useEvents from "../../useEvents";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const router = useRouter();
  const { getEventById, addEvent } = useEvents();
  const [event, setEvent] = useState();

  const onSubmit = (data) => {
    addEvent({
      ...data,
    });
    router.push("/events");
  };

  useEffect(() => {
    setEvent(getEventById(params.id));
  }, []);

  return (
    <Container>
      <Stack spacing={2} direction="row">
        <Typography variant="h5">Editar Evento</Typography>
      </Stack>
      {event && (
        <BannerForm onSubmit={onSubmit} defaultValues={event}></BannerForm>
      )}
    </Container>
  );
}
