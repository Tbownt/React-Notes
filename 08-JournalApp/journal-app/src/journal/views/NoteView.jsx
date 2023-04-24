import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks";
import { ImageGallery } from "../components";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startDeletingNote,
  startSaveNotes,
  startUploadingFiles,
} from "../../store/journal/thunks";

import SaveOutlined from "@mui/icons-material/SaveOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import IconButton from "@mui/material/IconButton";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import DeleteOutLine from "@mui/icons-material/DeleteOutline";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, onInputChange, formState, date } = useForm(note);

  const fileInputRef = useRef();

  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNotes());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight={100}>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onFileInputChange}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          onClick={onSaveNote}
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedio en el dia de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutLine />
          Borrar
        </Button>
      </Grid>
      {note.imageUrls && <ImageGallery images={note.imageUrls} />}
    </Grid>
  );
};
