import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../../types";

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: (userId: string) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {user.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user.email}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        color="primary"
        startIcon={<EditIcon />}
        onClick={onEdit}
      >
        Edit
      </Button>
      <Button
        size="small"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => onDelete(user._id)}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);

export default UserCard;
