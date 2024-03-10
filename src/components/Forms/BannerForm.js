import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

yup.addMethod(yup.object, "isAfter", function method(message) {
  return this.test("isAfter", message, (value) => value.isAfter(dayjs(), "h"));
});

const schema = yup
  .object({
    name: yup.string().required("El nombre es obligatorio"),
    url: yup.string().required("La url es obligatoria").url("La url no es valida."),
    date: yup.object().isAfter("La fecha debe ser posterior"),
    imgDesktop: yup.string().required("Esta imagen es obligatoria"),
    imgTablet: yup.string().required("Esta imagen es obligatoria"),
    imgMobile: yup.string().required("Esta imagen es obligatoria"),
  })
  .required();

export default function BannerForm({ onSubmit = () => {}, defaultValues }) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          date: dayjs(defaultValues.date, "YYYY-MM-DDTHH:mm:ss"),
        }
      : null,
    resolver: yupResolver(schema),
  });
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
            {errors.name && (
              <FormHelperText error variant="outlined">
                {errors.name?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={6} sm={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="component-simple">
              Url del Evento
            </InputLabel>
            <OutlinedInput
              label="Url del Evento"
              fullWidth
              {...register("url")}
            />
            {errors.url && (
              <FormHelperText error variant="outlined">
                {errors.url?.message}
              </FormHelperText>
            )}
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
                {errors.date && (
                  <FormHelperText error variant="outlined">
                    {errors.date?.message}
                  </FormHelperText>
                )}
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
                    id="imgDesktop"
                    ratio="2340 * 700"
                    value={value}
                    onChange={onChange}
                    maxSize={800000}
                    width={150}
                    height={150}
                  />
                )}
                control={control}
                name="imgDesktop"
              />
              {errors.imgDesktop && (
                <FormHelperText error variant="outlined">
                  {errors.imgDesktop?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4}>
              <Typography>Tablet:</Typography>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <ImageLoader
                    id="imgTablet"
                    ratio="1440 * 1080"
                    value={value}
                    onChange={onChange}
                    maxSize={800000}
                    width={150}
                    height={150}
                  />
                )}
                control={control}
                name="imgTablet"
              />
              {errors.imgTablet && (
                <FormHelperText error variant="outlined">
                  {errors.imgTablet?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={3}>
              <Typography>Mobile:</Typography>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <ImageLoader
                    id="imgMobile"
                    ratio="1920 * 1080"
                    value={value}
                    onChange={onChange}
                    maxSize={800000}
                    width={150}
                    height={150}
                  />
                )}
                control={control}
                name="imgMobile"
              />
              {errors.imgMobile && (
                <FormHelperText error variant="outlined">
                  {errors.imgMobile?.message}
                </FormHelperText>
              )}
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
