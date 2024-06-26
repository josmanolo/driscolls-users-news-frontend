import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    description: string;
    urlToImage: string | null;
  };
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { t } = useTranslation();

  return (
      <Card>
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
          <Button
            size="large"
            color="primary"
            component={RouterLink}
            to={`/news/${news.id}`}
          >
            {t("newsCard.goToArticle")}
          </Button>
        </CardActions>
      </Card>
  );
};

export default NewsCard;
