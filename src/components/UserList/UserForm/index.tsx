import { useEffect, useState } from "react";
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
import { User } from "../../../types";
import { useAppDispatch } from "../../../app/store";
import { addUser, fetchUsers, updateUser } from "../../../state/user.slice";
import { FAILED, SUCCEEDED } from "../../../state/status";
import { useTranslation } from "react-i18next";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  currentUser?: User | null;
  status?: string | null;
  error?: string | null;
}

interface ValidationErrors {
  name: string;
  email: string;
  password: string;
}

const UserForm = ({
  open,
  onClose,
  currentUser,
  status,
  error,
}: UserFormProps) => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentUser && open) {
      setUser({ _id: "", name: "", email: "", role: "", password: "" });
    } else if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setUser({ ...user, role: e.target.value });
  };

  const handleSubmit = () => {
    let errors = { name: "", email: "", password: "" };
    let formIsValid = true;

    if (!user.name) {
      errors.name = t("userForm.errors.nameRequired");
      formIsValid = false;
    }

    if (
      !user.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)
    ) {
      errors.email = t("userForm.errors.invalidEmail");
      formIsValid = false;
    }

    if (!user.password || user.password.length < 6) {
      errors.password = t("userForm.errors.passwordLength");
      formIsValid = false;
    }

    setValidationErrors(errors);

    if (formIsValid) {
      const action = currentUser?._id ? updateUser(user) : addUser(user);
      dispatch(action)
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        {t(currentUser ? "userForm.editUser" : "userForm.addNewUser")}
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label={t("userForm.name")}
            type="text"
            fullWidth
            variant="outlined"
            value={user.name}
            onChange={handleChange}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
          />
          <TextField
            margin="dense"
            name="email"
            label={t("userForm.emailAddress")}
            type="email"
            fullWidth
            variant="outlined"
            value={user.email}
            onChange={handleChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            margin="dense"
            name="password"
            label={t("userForm.password")}
            type="password"
            fullWidth
            variant="outlined"
            value={user.password}
            onChange={handleChange}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="role-select-label">{t("userForm.role")}</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={user.role}
              label={t("userForm.role")}
              onChange={handleRoleChange}
            >
              <MenuItem value={"user"}>{t("userForm.user")}</MenuItem>
              <MenuItem value={"admin"}>{t("userForm.admin")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("userForm.cancel")}</Button>
        <Button onClick={handleSubmit}>
          {t("userForm.saveUser")}
        </Button>
      </DialogActions>
      {status === FAILED && (
        <Typography color="error" className="form-message">
          {t("userForm.error")}
        </Typography>
      )}
      {status === SUCCEEDED && (
        <Typography color="primary" className="form-message">
          {t("userForm.userSavedSuccessfully")}
        </Typography>
      )}
    </Dialog>
  );
};

export default UserForm;
