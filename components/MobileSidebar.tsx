import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { NavItems, Logo } from "./";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="lg:hidden">
      <AppBar component="nav" sx={{ bgcolor: "#fff", padding: "30px 8px" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="end"
            aria-label="menu"
          >
            <MenuIcon sx={{ fontSize: 35 }} />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <NavItems handleClick={toggleDrawer(false)} />
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MobileSidebar;
