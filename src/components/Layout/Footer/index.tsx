import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box mt={5} py={3} bgcolor="text.secondary" color="white">
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © News Site
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
