import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
import { User } from "../../types";
import "./styles.scss";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    console.log(location)
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get<User>(
          `http://localhost:3001/api/users/${userId}`
        );
        setUser(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [location, userId]);

  const renderContent = useCallback(() => {
    if (loading) return <CircularProgress />;
    if (error)
      return (
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      );
    if (!user) return <Typography variant="h6">User not found</Typography>;

    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Role: {user.role}
          </Typography>
        </CardContent>
      </Card>
    );
  }, [loading, error, user]);

  return (
    <Container maxWidth="sm" className="profile-container">
      <Typography variant="h4" component="h4">
        User Profile
      </Typography>
      {renderContent()}
      {location.state?.fromUserList && (
        <Button
          variant="contained"
          component={Link}
          to="/users"
          className="back-button"
        >
          Back to User List
        </Button>
      )}
    </Container>
  );
};

export default UserProfile;
