import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { User } from "../../types";
import UserCard from "./UserCard";
import ConfirmDialog from "./ConfirmDialog";
import "./styles.scss";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../state/user.slice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { FAILED, LOADING, SUCCEEDED } from "../../state/status";

const UserList = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string>("");
  const [currentUserForEdit, setCurrentUserForEdit] = useState<User | null>(
    null
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    entities: users,
    status,
    error,
  } = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/news");
    }

    dispatch(fetchUsers());
  }, [dispatch, navigate, user?.role]);

  const handleOpenForm = () => {
    setCurrentUserForEdit(null);
    setOpenForm(true);
  };
  const handleCloseForm = () => setOpenForm(false);

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId))
        .unwrap()
        .then(() => {
          setConfirmation("User deleted successfully!");
          dispatch(fetchUsers());
          setTimeout(() => setConfirmation(""), 3000);
        })
        .catch((error) => {
          console.error("Error deleting user", error);
        })
        .finally(() => {
          setOpenConfirmDialog(false);
          setSelectedUserId(null);
        });
    }
  };

  const handleOpenFormForEdit = (user: User) => {
    setCurrentUserForEdit(user);
    setOpenForm(true);
  };

  return (
    <Container maxWidth="lg" className="users-list">
      <Box className="list-header">
        <Typography variant="h4" component="h2">
          User List
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenForm}
        >
          Create
        </Button>
      </Box>
      {status === LOADING && <CircularProgress />}
      {status === FAILED && <Typography color="error">{error}</Typography>}
      {confirmation && <Typography color="primary">{confirmation}</Typography>}
      {status === SUCCEEDED && (
        <Grid container spacing={4}>
          {users.map((user: User) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={user._id}
              className="user-card"
            >
              <UserCard
                user={user}
                onEdit={() => handleOpenFormForEdit(user)}
                onDelete={() => handleDeleteClick(user._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <UserForm
        open={openForm}
        onClose={handleCloseForm}
        currentUser={currentUserForEdit}
        status={status}
        error={error}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default UserList;
