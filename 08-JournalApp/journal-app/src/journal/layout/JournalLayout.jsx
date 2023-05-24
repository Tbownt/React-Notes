import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { NavBar, SideBar } from "../components";
import { useSelector } from "react-redux";

export const JournalLayout = ({ children }) => {
  const { isModalOpen } = useSelector((state) => state.journal);

  let drawerWidth = 240;

  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#f6f1f1" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar drawerWidth={isModalOpen ? drawerWidth : (drawerWidth = 0)} />
      <SideBar drawerWidth={isModalOpen ? drawerWidth : (drawerWidth = 65)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
