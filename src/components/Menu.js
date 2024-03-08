import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const handleLogout = async () => {
    await props.supabase.auth.signOut();
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#E5EAF2" }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          borderBottom: 1,
          borderColor: "grey.300",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            component={Link}
            to="/"
            disabled={!props.session}
          >
            Dashboard
          </Button>
          <Box>
            {props.session ? (
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="contained" component={Link} to="/signin">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Menu;
