import { Link as RouterLink } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from "@mui/material";

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    description: string;
    urlToImage: string | null;
  };
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
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
          <Button size="large" color="primary" component={RouterLink} to={`/news/${news.id}`}>
            Go to Article
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NewsCard;
