import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import "./styles.scss";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { login } from "../../state/auth.slice";
import { FAILED } from "../../state/status";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {

        const userRole = res.user.role;
        
        console.log(res)

        if (userRole === "admin") {
          navigate("/users");
        } else {
          navigate("/news");
        }
      });
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
          {status === FAILED && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
