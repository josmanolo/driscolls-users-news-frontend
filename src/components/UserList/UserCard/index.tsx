import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { User } from "../../../types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: (userId: string) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const { t } = useTranslation();
  return (
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
          {t("userCard.edit")} 
        </Button>
        <Button
          size="small"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(user._id)}
        >
          {t("userCard.delete")} 
        </Button>
        <Button
          size="small"
          color="primary"
          startIcon={<AccountCircleIcon />}
          component={Link}
          to={`/users/${user._id}`}
          state={{ fromUserList: true }}
        >
          {t("userCard.profile")} 
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
