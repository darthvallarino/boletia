"use client";
import { useState } from "react";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material//Edit";
import useEvents from "./useEvents";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

function DeleteConfirmation({ id, handleClose, handleOk }) {
  return (
    <Dialog open={!!id} onClose={handleClose}>
      <DialogTitle>Eliminar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Está seguro que desea eliminar este evento?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

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
  const { events, removeEvent } = useEvents();
  const [idDeleteConfirmation, setIdDeleteConfirmation] = useState(null);

  const handleOpenDeleteConfirmation = (id) => {
    setIdDeleteConfirmation(id);
  };
  const handleCloseDeleteConfirmation = () => {
    setIdDeleteConfirmation(null);
  };
  const handleOkDeleteConfirmation = () => {
    removeEvent(idDeleteConfirmation);
    setIdDeleteConfirmation(null);
  };
  const router = useRouter();
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
                  <TableCell></TableCell>
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
                      {dayjs(row.date, "YYYY-MM-DDTHH:mm:ss")
                        .locale("es-mx")
                        .format("dddd D [d]e MMMM [d]e YYYY")}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <IconButton
                        onClick={() => {
                          router.push(`/events/edit/${row.id}`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleOpenDeleteConfirmation(row.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <DeleteConfirmation
        id={idDeleteConfirmation}
        handleClose={handleCloseDeleteConfirmation}
        handleOk={handleOkDeleteConfirmation}
      />
    </Container>
  );
}
