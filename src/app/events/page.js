"use client";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useEvents from "./useEvents";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import 'dayjs/locale/es-mx';

function EnhancedTableToolbar() {
  const router = useRouter();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Eventos
      </Typography>

      <IconButton
        onClick={() => {
          router.push("/events/add");
        }}
      >
        <AddIcon />
      </IconButton>
    </Toolbar>
  );
}

export default function Home() {
  const { events } = useEvents();
  return (
    <Container>
      {events && (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Evento</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dayjs(row.date, "YYYY-MM-DDTHH:mm:ss").locale('es-mx').format("dddd D [d]e MMMM [d]e YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}
