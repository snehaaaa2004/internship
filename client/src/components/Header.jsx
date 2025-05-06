import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate for redirecting after logout
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact us" },
  ];

  if (!isLoggedIn) {
    navLinks.push(
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" }
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // or sessionStorage
    navigate("/login"); // Redirect to login page
  };

  const navButtonStyles = {
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
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#0a0a0a",
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          paddingY: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#00bcd4",
              fontWeight: "bold",
              letterSpacing: 1.5,
              cursor: "pointer",
              textShadow: "0 0 8px #00bcd4", // glow
            }}
          >
            TRANSFORM
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  backgroundColor: "#00bcd4",
                  color: "white",
                  boxShadow: "0 0 10px #00bcd4", // glow
                  "&:hover": {
                    boxShadow: "0 0 15px #00bcd4",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
              >
                <Box
                  sx={{
                    width: 250,
                    height: "100%",
                    backgroundColor: "#121212",
                    color: "#fff",
                  }}
                  role="presentation"
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                      <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Box>
                  <List>
                    {navLinks.map((link, index) => (
                      <ListItem
                        button
                        key={index}
                        component={NavLink}
                        to={link.path}
                        onClick={() => setDrawerOpen(false)}
                        sx={navButtonStyles}
                      >
                        <ListItemText primary={link.label} />
                      </ListItem>
                    ))}
                    {isLoggedIn && (
                      <ListItem
                        button
                        onClick={handleLogout}
                        sx={navButtonStyles}
                      >
                        <ListItemText primary="Logout" />
                      </ListItem>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navLinks.map((link, index) => (
                <Button
                  key={index}
                  component={NavLink}
                  to={link.path}
                  sx={navButtonStyles}
                >
                  {link.label}
                </Button>
              ))}
              {isLoggedIn && (
                <Button onClick={handleLogout} sx={navButtonStyles}>
                  Logout
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
