// import StarOutline from "@mui/icons-material/StarOutline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EventNoteIcon from "@mui/icons-material/EventNote";

export const NothingSelectedView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 115px)",
        backgroundColor: "primary.main",
        borderRadius: 5,
      }}
    >
      {/*  */}
      <Grid item xs={12}>
        <EventNoteIcon sx={{ fontSize: 100, color: "white" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="white" variant="h5" sx={{ textAlign: "center" }}>
          Selecciona o crea una entrada
        </Typography>
      </Grid>
    </Grid>
  );
};
