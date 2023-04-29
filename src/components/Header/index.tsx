import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ color: "#6e77f6" }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Security Mob
          </Typography>
          <Button
            color="inherit"
            onClick={() => window.location.replace(`/auth/login`)}
          >
            Login
          </Button>
          <Button
            color="inherit"
            onClick={() => window.location.replace(`/auth/register`)}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
