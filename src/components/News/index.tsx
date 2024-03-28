import {
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNews } from "../../state/news.slice";
import { FAILED, LOADING } from "../../state/status";
import NewsCard from "./NewsCard";

const News = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {status === FAILED && <Typography color="error">{error}</Typography>}
        {status === LOADING && !items && <CircularProgress />}
        <Grid container spacing={3}>
          {items.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default News;
