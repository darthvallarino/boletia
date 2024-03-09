import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import ImageLoader from "../Inputs/ImageLoader";

export default function BannerForm({ onSubmit = () => {} }) {
  const { handleSubmit, control, register } = useForm();
  const transformSubmit = (data) => {
    onSubmit({
      ...data,
      date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss"),
    });
  };

  return (
    <form onSubmit={handleSubmit(transformSubmit)}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item md={6} sm={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="component-simple">
              Nombre del Evento
            </InputLabel>
            <OutlinedInput
              label="Nombre del Evento"
              fullWidth
              {...register("name")}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} sm={12}>
          <Controller
            render={({ field: { onChange, onBlur, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Hora y Fecha"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              </LocalizationProvider>
            )}
            control={control}
            name="date"
            defaultValue={dayjs()}
          />
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={2}>
            <Grid item md={5}>
              <Typography>Desktop:</Typography>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <ImageLoader
                    id="img-desktop"
                    ratio="4 * 3"
                    value={value}
                    onChange={onChange}
                  />
                )}
                control={control}
                name="img-desktop"
              />
            </Grid>
            <Grid item md={4}>
              <Typography>Tablet:</Typography>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <ImageLoader
                    id="img-tablet"
                    ratio="6 * 4"
                    value={value}
                    onChange={onChange}
                  />
                )}
                control={control}
                name="img-tablet"
              />
            </Grid>
            <Grid item md={3}>
              <Typography>Mobile:</Typography>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <ImageLoader
                    id="img-mobile"
                    ratio="6 * 3"
                    value={value}
                    onChange={onChange}
                  />
                )}
                control={control}
                name="img-mobile"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
