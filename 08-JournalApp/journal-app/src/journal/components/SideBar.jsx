import { onToggleModalState } from "../../store/journal/journalSlice";
import { SideBarItem } from "./SideBarItem";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import  Button  from "@mui/material/Button";

export const SideBar = ({ drawerWidth }) => {
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.auth);
  const { notes, isModalOpen } = useSelector((state) => state.journal);

  const toggleDrawer = () => {
    dispatch(onToggleModalState());
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Button
        onClick={toggleDrawer}
        sx={{
          position: "relative",
          height: "100vh",
        }}
      >
        <ChevronRightIcon fontSize="large" />
      </Button>
      <Drawer
        variant="persistent"
        open={isModalOpen}
        anchor="left"
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginLeft: "25px" }}
          >
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItem {...note} key={note.id} />
          ))}
        </List>
        <Button
          onClick={toggleDrawer}
          sx={{ sm: { height: "20%" }, height: "15%", borderRadius: "25px" }}
        >
          <ChevronLeftIcon fontSize="large" />
        </Button>
      </Drawer>
    </Box>
  );
};
