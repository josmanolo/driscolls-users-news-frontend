import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import { logout } from "../../../state/auth.slice";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isAuthenticated = token !== null;
  const isAdmin = user?.role === "admin";
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: matches ? "row" : "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t("header.newsApp")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {isAuthenticated && (
              <>
                <Button color="inherit" component={Link} to="/news">
                  {t("header.news")}
                </Button>
                {isAdmin && (
                  <Button color="inherit" component={Link} to="/users">
                    {t("header.users")}
                  </Button>
                )}
                <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" noWrap>
                    {user?.name}
                  </Typography>
                </Box>
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ ml: 2 }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
