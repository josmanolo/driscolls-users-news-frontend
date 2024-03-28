import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNews } from "../../state/news.slice";
import { Link } from "react-router-dom";
import { FAILED, LOADING } from "../../state/status";

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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Typography variant="body1">Usuario: user</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {status === FAILED && <Typography color="error">{error}</Typography>}
        {status === LOADING && <CircularProgress />}
        <Grid container spacing={3}>
          {items.map((news) => (
            <Grid item xs={12} md={6} lg={4} key={news.id}>
              <Card sx={{ maxWidth: 345 }}>
                {news.urlToImage && (
                  <CardMedia
                    component="img"
                    height="240"
                    image={news.urlToImage}
                    alt={news.title}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {news.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Link
                    to={`/news/${news.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="large" color="primary">
                      Go to Article
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box mt={5} py={3} bgcolor="text.secondary" color="white">
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            © News Site
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default News;
