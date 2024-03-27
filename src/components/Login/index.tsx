import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import "./styles.scss";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<{
        token: string;
        user: { id: string; name: string; email: string; role: string };
      }>("http://localhost:3001/api/auth/login", { email, password });

      const {
        data: { user, token },
      } = response;

      login(user, token);

      const userRole = user.role;
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/news");
      }

      setError("");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="xs" component="main">
      <Box className="login-container">
        <Typography variant="h4" component="h1">
          Login to News App
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
          >
            Login
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
