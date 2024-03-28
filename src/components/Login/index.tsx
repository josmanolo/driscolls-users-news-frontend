import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import "./styles.scss";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { login } from "../../state/auth.slice";
import { FAILED } from "../../state/status";
import { useTranslation } from "react-i18next";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { status } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        const userRole = res.user.role;

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
          {t('login.welcome')}
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label={t('login.emailLabel')}
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label={t('login.passwordLabel')}
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
            {t('login.loginButton')}
          </Button>
          {status === FAILED && <Typography color="error">{t('login.loginFailed')}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
