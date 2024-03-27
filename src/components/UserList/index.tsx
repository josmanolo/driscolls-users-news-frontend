import { useState } from "react";
import { Container, Box, Button, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useFetchUsers from "../../hooks/useUserFetch";
import axios from "axios";
import { User } from "../../types";
import UserCard from "./UserCard";

import ConfirmDialog from "./ConfirmDialog";
import "./styles.scss";
import UserForm from "./UserForm";
import { Link } from "react-router-dom";

const UserList = () => {
  const { users, error, setUsers } = useFetchUsers();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string>("");
  const [currentUserForEdit, setCurrentUserForEdit] = useState<User | null>(
    null
  );

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${selectedUserId}`);
        setConfirmation("User deleted successfully!");
        setUsers(users.filter((user) => user._id !== selectedUserId));
        setTimeout(() => setConfirmation(""), 3000);
      } catch (error) {
        console.error("Error deleting user", error);
      } finally {
        setOpenConfirmDialog(false);
      }
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
      {error && <Typography color="error">{error}</Typography>}
      {confirmation && <Typography color="primary">{confirmation}</Typography>}
      <Grid container spacing={4}>
        {users.map((user: User) => (
          <Grid item xs={12} sm={6} md={4} key={user._id} className="user-card">
            <Link to={`/users/${user._id}`} state={{ fromUserList: true }}>
              <UserCard
                user={user}
                onEdit={() => handleOpenFormForEdit(user)}
                onDelete={() => handleDeleteClick(user._id)}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
      <UserForm
        setUsers={setUsers}
        open={openForm}
        onClose={handleCloseForm}
        currentUser={currentUserForEdit}
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
