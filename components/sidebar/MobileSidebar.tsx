import { useState } from "react";
import { AppBar, Toolbar, Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavItems, Logo } from "..";

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
