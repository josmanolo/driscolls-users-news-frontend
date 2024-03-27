import { useEffect, useState } from "react";
import { User } from "../../types";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.scss";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "http://localhost:3001/api/users"
        );
        setUsers([
          {
            id: "sd323es",
            name: "Josue Lopez",
            email: "jomalolep@gmail.com",
            role: "admin",
          },
          {
            id: "sd323es",
            name: "Josue Lopez",
            email: "jomalolep@gmail.com",
            role: "admin",
          },
          {
            id: "sd323es",
            name: "Josue Lopez",
            email: "jomalolep@gmail.com",
            role: "admin",
          },
          {
            id: "sd323es",
            name: "Josue Lopez",
            email: "jomalolep@gmail.com",
            role: "admin",
          },
          {
            id: "sd323es",
            name: "Josue Lopez",
            email: "jomalolep@gmail.com",
            role: "admin",
          },
          {
            id: "sd323es",
            name: "Josue Lopez",
            email: "jomalolep@gmail.com",
            role: "admin",
          },
          {
            id: "sd323es",
            name: "Josue Lopez",
            email: "jomalolep@gmail.com",
            role: "admin",
          },
        ]);
      } catch (error) {
        setError("Error fetching users");
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreate = () => {
    // Lógica para crear un nuevo usuario
  };

  const handleEdit = (userId: string) => {
    // Lógica para editar un usuario basado en userId
  };

  const handleDelete = (userId: string) => {
    // Lógica para eliminar un usuario basado en userId
  };

  return (
    <Container maxWidth="lg" className="users-list">
      <Box className="list-header">
        <Typography variant="h4" component="h2">
          User List
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained">
          Create
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}{" "}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserList;
