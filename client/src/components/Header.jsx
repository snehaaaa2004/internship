import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#0a0a0a",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        paddingY: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo or Title */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#00bcd4",
            fontWeight: "bold",
            letterSpacing: 1.5,
            cursor: "pointer",
          }}
        >
          TRANSFORM
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: { xs: 1, md: 3 } }}>
          {["/", "/login", "/register","/about","/contact us"].map((path, index) => (
            <Button
              key={index}
              component={NavLink}
              to={path}
              exact={path === "/"}
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: "medium",
                fontSize: { xs: "0.8rem", md: "1rem" },
                position: "relative",
                "&:hover": {
                  color: "#00bcd4",
                  backgroundColor: "transparent",
                },
                "&.active": {
                  color: "#00bcd4",
                  fontWeight: "bold",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#00bcd4",
                    bottom: "-4px",
                    left: 0,
                  },
                },
              }}
            >
              {path === "/" ? "Home" : path.replace("/", "").replace(/^./, str => str.toUpperCase())}
              
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
