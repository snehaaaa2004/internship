import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Paper, Button, Grid } from "@mui/material";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          'url("https://st.depositphotos.com/1000350/2282/i/450/depositphotos_22823894-stock-photo-dark-concrete-texture.jpg")',
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          color: "white",
          fontWeight: "bold",
          marginBottom: 4,
          textAlign: "center",
          fontFamily: "initial",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        Admin Dashboard
      </Typography>

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "center",
        }}
      >
        {/* User Details Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={8}
            sx={{
              backgroundColor: "#212121",
              borderRadius: 3,
              padding: 3,
              textAlign: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 24px rgba(248, 250, 250, 0.2)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              User Details
            </Typography>
            <Typography
              sx={{
                color: "white",
                marginBottom: 3,
                fontSize: "1.1rem",
              }}
            >
              Manage all user data.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": { backgroundColor: "black", color: "white" },
                padding: "10px 20px",
                borderRadius: "20px",
                textTransform: "none",
              }}
              onClick={() => navigate("/edit-user")}
              aria-label="Edit User Details"
            >
              Edit Users
            </Button>
          </Paper>
        </Grid>

        {/* Plan Details Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={8}
            sx={{
              backgroundColor: "#212121",
              borderRadius: 3,
              padding: 3,
              textAlign: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 24px rgba(240, 243, 243, 0.2)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              User Messages
            </Typography>
            <Typography
              sx={{
                color: "white",
                marginBottom: 3,
                fontSize: "1.1rem",
              }}
            >
              Messages from customers.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": { backgroundColor: "black", color: "white" },
                padding: "10px 20px",
                borderRadius: "20px",
                textTransform: "none",
              }}
              onClick={() => navigate("/mess")}
              aria-label="Edit Plan Details"
            >
              View
            </Button>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
};

export default Admin;
