import { useState } from "react";
import { User } from "../../../types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>; 
}

const UserForm = ({ open, onClose, setUsers }: UserFormProps) => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setUser({ ...user, [name]: value });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setUser({ ...user, role: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post<User>("http://localhost:3001/api/users", user);
      setConfirmation("User created successfully!");
      setUsers(prevUsers => [...prevUsers, user]);
      setTimeout(() => {
        onClose();
        setConfirmation("");
        setError("");
        setUser({
          _id: "",
          name: "",
          email: "",
          role: "",
          password: "",
        });
      }, 1500);
    } catch (error) {
      setError("Error creating user");
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={user.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={user.password}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={user.role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add User</Button>
      </DialogActions>
      {error && (
        <Typography color="error" className="form-message">
          {error}
        </Typography>
      )}
      {confirmation && (
        <Typography color="primary" className="form-message">
          {confirmation}
        </Typography>
      )}
    </Dialog>
  );
};

export default UserForm;
