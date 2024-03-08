import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm, Controller } from "react-hook-form";
import dayjs from 'dayjs';

export default function BannerForm() {
  const { handleSubmit, reset, watch, control, register } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item md={12} sm={6}>
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
        <Grid item md={12} sm={6}>
          <Controller
            render={({ field: { onChange, onBlur, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Hora y Fecha"
                  value={value}
                  onChange={onChange}
                />
              </LocalizationProvider>
            )}
            control={control}
            name="date"
            defaultValue={dayjs()}
          />
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
