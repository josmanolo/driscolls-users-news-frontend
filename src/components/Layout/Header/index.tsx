import { AppBar, Box, IconButton, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import { logout } from "../../../state/auth.slice";

const Header = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const isAuthenticated = token !== null;
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News App
        </Typography>
        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/news">
              News
            </Button>
            {isAdmin && (
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
            )}
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              <Typography variant="body1">{user?.name}</Typography>
            </Box>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
