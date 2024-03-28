import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { RootState, useAppDispatch } from "../../app/store";
import { fetchNews } from "../../state/news.slice";
import { IDLE, LOADING, SUCCEEDED } from "../../state/status";

const NewsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { items: newsList, status } = useSelector(
    (state: RootState) => state.news
  );
  const news = newsList.find((newsItem) => newsItem.id === id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === IDLE) {
      dispatch(fetchNews());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === SUCCEEDED && !news) {
      navigate("/");
    }
  }, [news, status, navigate]);

  if (status === LOADING) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (status === SUCCEEDED && !news) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        {news?.urlToImage && (
          <Box
            component="img"
            sx={{
              height: "auto",
              width: "100%",
              borderRadius: "4px",
            }}
            alt={news.title}
            src={news.urlToImage}
          />
        )}
        <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2 }}>
          {news?.title}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          Author: {news?.author}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Published: {news?.publishedAt}
        </Typography>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          {news?.content || news?.description}
        </Typography>
      </Paper>
    </Container>
  );
};

export default NewsDetails;
