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
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
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
          {t(error)}
        </Typography>
      );
    if (!user)
      return (
        <Typography variant="h6">{t("userProfile.userNotFound")}</Typography>
      );

    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("userProfile.email")}: {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("userProfile.role")}: {user.role}
          </Typography>
        </CardContent>
      </Card>
    );
  }, [loading, error, user, t]);

  return (
    <Container maxWidth="sm" className="profile-container">
      <Typography variant="h4" component="h4">
        {t("userProfile.userProfile")}
      </Typography>
      {renderContent()}
      {location.state?.fromUserList && (
        <Button
          variant="contained"
          component={Link}
          to="/users"
          className="back-button"
        >
          {t("userProfile.backToUserList")}
        </Button>
      )}
    </Container>
  );
};

export default UserProfile;
